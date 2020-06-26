const { Pool } = require("pg");
const { getLogLevel } = require("./utils");
const queries = require("./queries");

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit();
});

class PgTaskQ {
  constructor(opts) {
    this.dependencies = opts.dependencies || {};
    this.processingQueue = opts.processingQueue || false;
    this.processQueueEvery = opts.processQueueEvery || 5000;
    this.parentTask = opts.parentTask || null;
    this.logs = opts.logs || {};
    this.pool = opts.pool || new Pool(opts.db);
    this.running = opts.running || false;
    this.subscribers = opts.subscribers || [];
    this.logLevel = opts.logLevel || "warn";
    this.maxAttempts = opts.maxAttempts || 1;
    this.backoffDelay = opts.backoffDelay || "20 seconds";
    this.backoffDecay = opts.backoffDecay || "exponential";
    this.logger = opts.logger || console.log;
  }

  on(event, subscriber) {
    this.subscribers.push([`taskq:${event}`, subscriber]);
  }

  createSubTaskQ({ parentTask }) {
    return new PgTaskQ(Object.assign({}, this, { parentTask }));
  }

  log(level = "info") {
    return (msg) => {
      if (getLogLevel(level) > getLogLevel(this.logLevel)) return;
      this.logger(`[TaskQ:${level}]:`, msg, `\n`);
    };
  }

  createTaskLogger({ executionId }) {
    return (message) => {
      let messageStr;
      if (message === null) messageStr = "null";
      else if (message === undefined) messageStr = "undefined";
      else {
        try {
          messageStr = JSON.stringify(message);
        } catch {
          messageStr = message.toString();
        }
      }
      this.log("debug")(messageStr);
      return this.pool
        .query(
          queries.appendLog({
            executionId,
            message: `${messageStr}\n`,
          })
        )
        .catch(this.log("error"));
    };
  }

  take(taskName) {
    const methods = {
      onFirstAttempt: (firstAttemptCallback) => {
        this.on("running", (updatedTask) => {
          if (taskName !== updatedTask.name || updatedTask.attempts > 1) return;
          firstAttemptCallback({
            task: updatedTask,
            taskq: this.createSubTaskQ({ parentTask: updatedTask }),
          });
        });
        return methods;
      },
      onExecute: (executeCallback) => {
        this.on("running", async (updatedTask) => {
          if (taskName !== updatedTask.name) return;

          const subTaskQ = this.createSubTaskQ({ parentTask: updatedTask });
          const taskLogger = this.createTaskLogger({
            executionId: updatedTask.execution_id,
            taskName: updatedTask.name,
          });

          try {
            await executeCallback({
              ...this.dependencies,
              taskq: subTaskQ,
              task: updatedTask,
              params: updatedTask.params,
              log: taskLogger,
            });

            await this.pool
              .query(
                queries.updateExecutionSuccess({ id: updatedTask.execution_id })
              )
              .catch(this.log("error"));
          } catch (err) {
            await taskLogger(err.stack);
            await this.pool.query(
              queries.updateExecutionFailure({
                id: updatedTask.execution_id,
                maxAttempts: this.maxAttempts,
              })
            );
          }
        });
        return methods;
      },
      onSuccess: (successCallback) => {
        this.on("success", (updatedTask) => {
          if (taskName !== updatedTask.name) return;
          successCallback({
            task: updatedTask,
            taskq: this.createSubTaskQ({ parentTask: updatedTask }),
          });
        });
        return methods;
      },
      onFailure: (failureCallback) => {
        this.on("failure", (updatedTask) => {
          if (taskName !== updatedTask.name) return;
          failureCallback({
            task: updatedTask,
            taskq: this.createSubTaskQ({ parentTask: updatedTask }),
          });
        });
        return methods;
      },
    };
    return methods;
  }

  enqueue(task) {
    return this.insertTask({ ...task, executeAtDateTime: new Date() });
  }

  schedule(task) {
    if (task.executeNow === true) {
      return this.enqueue(task);
    }
    return this.insertTask(task);
  }

  scheduleAgain(originalTask, overrides) {
    return this.insertTask({
      name: originalTask.name,
      params: originalTask.params,
      parentId: originalTask.parent_id,
      executeInSumOf: overrides.add && {
        datetime: originalTask.execute_at,
        interval: overrides.add,
      },
      ...overrides,
    });
  }

  async insertTask(task) {
    let insertQuery;
    let executionParameters = 0;

    if (task.executeInSumOf) {
      executionParameters += 1;
      insertQuery = queries.insertTaskToExecuteInSumOf;
    }
    if (task.executeIn) {
      executionParameters += 1;
      insertQuery = queries.insertTaskToExecuteIn;
    }
    if (task.executeTodayAt) {
      executionParameters += 1;
      insertQuery = queries.insertTaskToExecuteTodayAt;
    }
    if (task.executeAtDateTime) {
      executionParameters += 1;
      insertQuery = queries.insertTaskToExecuteAtDateTime;
    }
    if (executionParameters > 1) {
      this.log("warn")(
        `Task ${task.name} has conflicting parameters for scheduling execution. Choose one of executeAt|executeIn|executeInSumOf.`
      );
    }
    if (executionParameters < 1) {
      throw new Error(
        `Task ${task.name} was not given a parameter for scheduling execution`
      );
    }

    await this.pool
      .query(
        insertQuery({
          ...task,
          params: task.params || {},
          parentId:
            typeof task.parentId !== "undefined"
              ? task.parentId
              : this.parentTask && this.parentTask.id,
        })
      )
      .then((result) => result.rows[0])
      .catch(this.log("error"));
  }

  run() {
    if (this.running) {
      throw new Error("taskq.run() should only be invoked once per process");
    }
    this.running = true;
    this.setUpInfoLogging();
    this.setUpEventListeners().catch((err) => {
      this.log("error")(err);
      process.exit(1);
    });
    setInterval(() => {
      if (this.processingQueue) return;
      this.processQueue().catch((err) => {
        this.log("error")("Failed to process queue");
        this.log("error")(err);
      });
    }, this.processQueueEvery);
  }

  async processQueue() {
    this.processingQueue = true;
    const {
      rows: [taskToProcess],
      rowCount: taskRowCount,
    } = await this.pool.query(
      queries.selectNextTask({
        maxAttempts: this.maxAttempts,
        backoffDelay: this.backoffDelay,
        backoffDecay: this.backoffDecay,
      })
    );

    if (taskRowCount === 0) {
      this.processingQueue = false;
      return;
    }

    await this.pool
      .query(queries.insertExecution({ taskId: taskToProcess.id }))
      .catch(this.log("error"));

    this.processQueue();
  }

  async setUpEventListeners() {
    const client = await this.pool.connect();

    await client.query(queries.listen());
    client.on("notification", ({ channel, payload }) => {
      let parsedPayload = payload;
      try {
        parsedPayload = JSON.parse(payload);
      } catch {}
      this.subscribers.forEach(([event, subscriber]) => {
        if (channel !== event) return;
        subscriber(parsedPayload);
      });
    });
  }

  setUpInfoLogging() {
    this.on("running", (task) => {
      this.log("info")(
        `Executing task "${task.name}" (execution id: ${task.execution_id})`
      );
    });
    this.on("success", (task) => {
      this.log("info")(
        `Successfully executed task "${task.name}" (execution id: ${task.execution_id})`
      );
    });
    this.on("failure", (task) => {
      this.log("info")(
        `Failed to execute task "${task.name}" (execution id: ${task.execution_id})`
      );
    });
    this.on("pending", (task) => {
      this.log("info")(`Enqueued task "${task.name}" (task id: ${task.id})`);
    });
    this.on("upsert", (task) => {
      this.log("info")(
        `Already enqueued task "${task.name}" (task id: ${task.id})`
      );
    });
  }
}

module.exports = TaskQ;
