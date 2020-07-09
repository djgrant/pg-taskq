const { Pool } = require("pg");
const { getLogLevel, getStartOfToday } = require("./utils");
const { Take } = require("./take");
const queries = require("./queries");

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});

class TaskQ {
  constructor(opts) {
    this.dependencies = opts.dependencies || {};
    this.logLevel = opts.logLevel || "warn";
    this.maxAttempts = opts.maxAttempts || 1;
    this.backoffDelay = opts.backoffDelay || "20 seconds";
    this.backoffDecay = opts.backoffDecay || "exponential";
    this.logger = opts.logger || console.log;
    this.timeout = opts.timeout || "30 seconds";

    // Private
    this.processQueueEvery = opts.processQueueEvery || 1000;
    this.parentTask = opts.parentTask || null;
    this.pool = opts.pool || new Pool(opts.db);
    this.started = opts.started || false;
    this.subscribers = opts.subscribers || [];
    this.processingQueue = false;
    this.processingPromise = Promise.resolve();
    this.logQ = opts.logQ || [];

    if (opts.schema) {
      this.pool.on("connect", (client) =>
        client.query(`SET search_path TO ${opts.schema}`)
      );
    }
  }

  on(event, subscriber) {
    this.subscribers.push([`taskq:${event}`, subscriber]);
  }

  createSubTaskQ({ parentTask }) {
    return new TaskQ(Object.assign({}, this, { parentTask }));
  }

  log(level = "info", msg) {
    const log = (msg) => {
      if (getLogLevel(level) > getLogLevel(this.logLevel)) return;
      this.logger(`[TaskQ:${level}]:`, msg);
    };
    if (msg) return log(msg);
    return log;
  }

  createTaskLogger({ executionId }) {
    return (...messages) => {
      const message = messages
        .map((message) => {
          this.log("debug")(message);
          let messageStr;
          if (message === null) messageStr = "null";
          else if (message === undefined) messageStr = "undefined";
          else if (message instanceof Error)
            messageStr = message.stack || message.toString();
          else {
            try {
              messageStr = JSON.stringify(message);
            } catch {
              messageStr = message.toString();
            }
          }
          return messageStr;
        })
        .join("");

      this.logQ.push({ message, executionId });
    };
  }

  getExecutionParams(task) {
    const subTaskQ = this.createSubTaskQ({ parentTask: task });
    const taskLogger = this.createTaskLogger({
      executionId: task.execution_id,
      taskName: task.name,
    });

    const executionParams = {
      context: task.context,
      params: task.params,
      taskq: subTaskQ,
      task: task,
      log: taskLogger,
    };

    const dependencies =
      typeof this.dependencies === "function"
        ? this.dependencies(executionParams)
        : this.dependencies;

    return {
      ...dependencies,
      ...executionParams,
    };
  }

  take(taskNameOrTaskNames, takeCallback) {
    const taskNames = Array.isArray(taskNameOrTaskNames)
      ? taskNameOrTaskNames
      : [taskNameOrTaskNames];

    const take = new Take();

    taskNames.forEach((taskName) => {
      this.on("timeout", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onTimeoutCallback !== "function") return;
        take.onTimeoutCallback(params);
      });

      this.on("locked", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onLockedCallback !== "function") return;
        take.onLockedCallback(params);
      });

      this.on("failure", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onFailureCallback !== "function") return;
        take.onFailureCallback(params);
      });

      this.on("success", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onSuccessCallback !== "function") return;
        take.onSuccessCallback(params);
      });

      this.on("running", async (params) => {
        const onExecuteCallback = takeCallback || take.onExecuteCallback;

        if (taskName !== params.task.name) return;
        if (typeof onExecuteCallback !== "function") return;

        try {
          if (
            params.task.attempts === 1 &&
            typeof take.onFirstAttemptCallback === "function"
          ) {
            await take.onFirstAttemptCallback(params);
          }

          await onExecuteCallback(params);

          this.pool
            .query(
              queries.updateExecutionSuccess({
                id: params.task.execution_id,
              })
            )
            .catch(this.log("error"));
        } catch (err) {
          await params.log(err);

          this.pool
            .query(
              queries.updateExecutionFailure({
                id: params.task.execution_id,
                maxAttempts: this.maxAttempts,
              })
            )
            .catch(this.log("error"));
        }
      });
    });

    return take;
  }

  enqueue(task, params) {
    if (typeof task === "string") {
      task = { name: task, params };
    }
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
      context: originalTask.context,
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
      insertQuery = queries.insertTaskToExecuteInSumOf;
      task.executeInSumOf = {
        datetime: getStartOfToday(),
        interval: task.executeTodayAt,
      };
    }
    if (task.executeAtDateTime) {
      executionParameters += 1;
      insertQuery = queries.insertTaskToExecuteAtDateTime;
    }
    if (executionParameters > 1) {
      this.log("warn")(
        `Task ${task.name} has conflicting parameters for scheduling execution. Choose one of executeAt|executeIn|executeTodayAt.`
      );
    }

    if (executionParameters < 1) {
      throw new Error(
        `Task ${task.name} was not given a parameter for scheduling execution`
      );
    }

    return this.pool
      .query(
        insertQuery({
          ...task,
          params: task.params || {},
          context:
            task.context || (this.parentTask ? this.parentTask.context : {}),
          parentId:
            typeof task.parentId !== "undefined"
              ? task.parentId
              : this.parentTask && this.parentTask.id,
        })
      )
      .then((result) => result.rows[0])
      .catch(this.log("error"));
  }

  start() {
    if (this.started) {
      throw new Error("taskq.run() should only be invoked once per process");
    }
    this.started = true;
    this.setUpInfoLogging();
    this.setUpEventListeners().catch((err) => {
      this.log("error")(err);
      process.exit(1);
    });

    let failures = 0;

    const ticker = () => {
      if (!this.started) return;
      this.processingPromise = this.processQueue()
        .then(() => {
          failures = 0;
          setTimeout(ticker, this.processQueueEvery);
        })
        .catch((err) => {
          this.log("error")(err);
          if (++failures > 2) {
            process.exit(1);
          } else {
            this.log("error")("Failed to process queue. Retrying...");
          }
          setTimeout(ticker, this.processQueueEvery);
        });
    };

    ticker();
  }

  async processQueue() {
    try {
      const { rows } = await this.pool.query(
        queries.processNextTask({
          maxAttempts: this.maxAttempts,
          backoffDelay: this.backoffDelay,
          backoffDecay: this.backoffDecay,
        })
      );
      await this.updateTimedOutExecutions();
      await this.processLogs();
      if (this.started && rows.length) {
        await this.processQueue();
      }
    } catch (err) {
      this.log("error")(err);
    }
  }

  async updateTimedOutExecutions() {
    try {
      const { rows: timedOutExecutions } = await this.pool.query(
        queries.selectTimedOutExecutions({ timeout: this.timeout })
      );
      Promise.all(
        timedOutExecutions.map((timedOutExecution) =>
          this.pool.query(
            queries.updateExecutionTimeout({
              id: timedOutExecution.id,
              maxAttempts: this.maxAttempts,
            })
          )
        )
      );
    } catch (err) {
      this.log("error")(err);
    }
  }

  async processLogs() {
    while (this.logQ.length) {
      const { message, executionId } = this.logQ.shift();
      await this.pool
        .query(
          queries.appendLog({
            executionId,
            message: `${message}\n`,
          })
        )
        .catch(this.log("error"));
    }
  }

  async setUpEventListeners() {
    const client = (this.notificationClient = await this.pool.connect());
    await client.query(queries.listen());
    client.on("notification", ({ channel, payload }) => {
      let task = payload;
      try {
        task = JSON.parse(payload);
      } catch {}
      this.subscribers.forEach(([event, subscriber]) => {
        if (channel !== event) return;
        const params = this.getExecutionParams(task);
        subscriber(params);
      });
    });
  }

  setUpInfoLogging() {
    this.on("pending", ({ task }) => {
      this.log("info")(`Enqueued task "${task.name}" (task id: ${task.id})`);
    });
    this.on("running", ({ task }) => {
      this.log("info")(
        `Executing task "${task.name}" (execution id: ${task.execution_id})`
      );
    });
    this.on("timeout", ({ task }) => {
      this.log("info")(
        `Task "${task.name}" timed out after ${this.timeout} (execution id: ${task.execution_id})`
      );
    });
    this.on("failure", ({ task }) => {
      this.log("info")(
        `Task "${task.name}" failed to execute (execution id: ${task.execution_id})`
      );
    });
    this.on("success", ({ task }) => {
      this.log("info")(
        `Task "${task.name}" successfully executed (execution id: ${task.execution_id})`
      );
    });
    this.on("no-op", ({ task }) => {
      this.log("info")(
        `Already enqueued task "${task.name}" (task id: ${task.id})`
      );
    });
  }

  async stop() {
    if (this.started) {
      this.started = false;
      await this.processingPromise.catch();
      this.notificationClient.end();
      this.pool.end();
    } else {
      console.log("Can't stop TaskQ. Not currently running.");
    }
  }
}

module.exports = TaskQ;
