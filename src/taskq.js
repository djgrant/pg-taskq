const { Pool } = require("pg");
const { getLogLevel } = require("./utils");
const queries = require("./queries");

class TaskQ {
  constructor(opts) {
    this.dependencies = opts.dependencies || {};
    this.processingQueue = opts.processingQueue || false;
    this.processQueueEvery = opts.processQueueEvery || 5000;
    this.parentId = opts.parentId || null;
    this.tasks = opts.tasks || {};
    this.logs = opts.logs || {};
    this.pool = opts.pool || new Pool(opts.db);
    this.running = opts.running || false;
    this.subscribers = opts.subscribers || [];
    this.logLevel = opts.logLevel || "warn";
    this.maxAttempts = opts.maxAttempts || 1;
    this.backoffDelay = opts.backoffDelay || "20 seconds";
    this.backoffDecay = opts.backoffDecay || "exponential";
  }

  on(event, subscriber) {
    this.subscribers.push([`taskq:${event}`, subscriber]);
  }

  createSubTaskQ({ parentId }) {
    return new TaskQ(Object.assign({}, this, { parentId }));
  }

  log(level = "info") {
    return (msg) => {
      if (getLogLevel(level) > getLogLevel(this.logLevel)) return;
      console.log(`[TaskQ:${level}]:`, msg, `\n`);
    };
  }

  createTaskLogger({ executionId }) {
    return (message) => {
      let messageStr;
      if (message === null) messageStr = "null";
      else if (message === undefined) messageStr = "undefined";
      else messageStr = message.toString();
      this.log("debug")(messageStr);
      return this.pool
        .query(
          queries.appendLog({
            executionId,
            message: `${message}\n`,
          })
        )
        .catch(this.log("error"));
    };
  }

  process(taskName, task) {
    this.tasks[taskName] = task;
  }

  enqueue(opts) {
    return this.schedule({ ...opts, executeAt: new Date() });
  }

  async schedule({ task: taskName, executeAt, params = {} }) {
    const scheduledFor = executeAt;
    const {
      rows: [insertedTask],
    } = await this.pool.query(
      queries.insertTask({
        name: taskName,
        params,
        scheduledFor,
        parentId: this.parentId,
      })
    );

    this.log("info")(
      `Enqueued task "${taskName}" (task id: ${insertedTask.id})`
    );

    return {
      on: (status, listener) => {
        if (!["success", "failure", "running"].includes(status)) return;
        this.on(status, (updatedTask) => {
          if (insertedTask.id !== updatedTask.id) return;
          listener(insertedTask);
        });
      },
    };
  }

  async run() {
    if (this.running) {
      throw new Error("taskq.run() should only be invoked once per process");
    }
    this.running = true;
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

    // FIXME - Errors from process queue are not always propogating for some reason
    process.on("unhandledRejection", (reason) => {
      this.log("error")(reason);
      process.exit();
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

    const {
      rows: [execution],
    } = await this.pool.query(
      queries.insertExecution({ taskId: taskToProcess.id })
    );

    const subTaskQ = this.createSubTaskQ({ parentId: taskToProcess.id });
    const taskLogger = this.createTaskLogger({
      executionId: execution.id,
      taskName: taskToProcess.name,
    });

    try {
      this.log("info")(
        `Executing task "${taskToProcess.name}" (execution id: ${execution.id})`
      );

      if (!this.tasks[taskToProcess.name]) {
        const missingTaskErrorMessage = `Could not process task "${taskToProcess.name}". Add to your worker: manager.process("${taskToProcess.name}", runTask).`;
        this.log("info")(missingTaskErrorMessage);
        throw new Error(missingTaskErrorMessage);
      }

      await this.tasks[taskToProcess.name]({
        ...this.dependencies,
        taskq: subTaskQ,
        params: taskToProcess.params,
        log: taskLogger,
      });

      try {
        await this.pool.query(
          queries.updateExecutionSuccess({ id: execution.id })
        );
        this.log("info")(
          `Successfully executed task "${taskToProcess.name}" (execution id: ${execution.id})`
        );
      } catch (err) {
        this.log("error")(err);
      }
    } catch (err) {
      this.log("info")(
        `Failed to execute task "${taskToProcess.name}" (execution id: ${execution.id})`
      );
      await taskLogger(err);
      await this.pool.query(
        queries.updateExecutionFailure({
          id: execution.id,
          maxAttempts: this.maxAttempts,
        })
      );
    }
    this.processQueue();
  }
}

module.exports = TaskQ;
