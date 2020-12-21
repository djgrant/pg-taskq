const { Pool } = require("pg");
const { serializeError } = require("serialize-error");
const { getLogLevel, getStartOfToday } = require("./utils");
const { Take } = require("./take");
const queries = require("./queries");

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});

class PgTaskQ {
  constructor(opts) {
    this.dependencies = opts.dependencies || {};
    this.logLevel = opts.logLevel || "warn";
    this.maxAttempts = opts.maxAttempts || 1;
    this.backoffDelay = opts.backoffDelay || "20 seconds";
    this.backoffDecay = opts.backoffDecay || "exponential";
    this.logger = opts.logger || console.log;
    this.timeout = opts.timeout || "5 minutes";
    this.concurrency = opts.concurrency || 1;
    this.processQueueEvery = opts.processQueueEvery || 100;
    this.pool = opts.pool || new Pool(opts.db);

    // Private
    this.parentTask = opts.parentTask || null;
    this.started = opts.started || false;
    this.subscribers = opts.subscribers || [];
    this.processingQueue = opts.processingQueue || false;
    this.processingPromise = opts.processingPromise || Promise.resolve();
    this.logQ = opts.logQ || [];
    this.registeredTasks = opts.registeredTasks || [];

    if (opts.schema) {
      this.pool.on("connect", (client) =>
        client.query(`SET search_path TO ${opts.schema}`)
      );
    }
  }

  on(event, subscriber) {
    this.subscribers.push([event, subscriber]);
  }

  createSubTaskQ({ parentTask }) {
    return new PgTaskQ(Object.assign({}, this, { parentTask }));
  }

  log(level = "info", ...messages) {
    const log = (...messages) => {
      if (getLogLevel(level) > getLogLevel(this.logLevel)) return;
      this.logger(`[TaskQ:${level}]:`, ...messages);
    };
    if (messages.length) return log(...messages);
    return log;
  }

  createExecutionLogger({ executionId }) {
    return (...messages) => {
      messages.forEach((msg) =>
        this.log("debug", `[Execution: ${executionId}]:`, msg)
      );
      messages
        .map(serializeError)
        .map(JSON.stringify)
        .forEach((message) => {
          this.logQ.push({ message, executionId });
        });
    };
  }

  async getExecutionParams(task, execution) {
    const subTaskQ = this.createSubTaskQ({ parentTask: task });
    const taskLogger = execution.id
      ? this.createExecutionLogger({
          executionId: execution.id,
        })
      : (msg) => {
          this.log(
            "error",
            "log() was called on a task that has not yet started. Skipped log message:",
            msg
          );
        };

    const getStats = async () =>
      this.pool
        .query(queries.selectStats({ taskId: task.id }))
        .then((result) => result.rows[0]);

    const params = {
      context: task.context,
      params: task.params,
      taskq: subTaskQ,
      task,
      execution,
      log: taskLogger,
      getStats,
    };

    const dependencies =
      typeof this.dependencies === "function"
        ? await this.dependencies(params)
        : this.dependencies;

    return {
      ...dependencies,
      ...params,
    };
  }

  take(taskNameOrTaskNames, takeCallback) {
    const taskNames = Array.isArray(taskNameOrTaskNames)
      ? taskNameOrTaskNames
      : [taskNameOrTaskNames];

    const take = new Take();

    taskNames.forEach((taskName) => {
      this.registeredTasks.push({
        name: taskName,
        take,
        callback: takeCallback,
      });

      this.on("timeout", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onTimeoutCallback !== "function") return;
        delete params.taskq;
        take.onTimeoutCallback(params);
      });

      this.on("locked", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onLockedCallback !== "function") return;
        delete params.taskq;
        take.onLockedCallback(params);
      });

      this.on("failure", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onFailureCallback !== "function") return;
        delete params.taskq;
        take.onFailureCallback(params);
      });

      this.on("success", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onSuccessCallback !== "function") return;
        delete params.taskq;
        take.onSuccessCallback(params);
      });

      this.on("complete", (params) => {
        if (taskName !== params.task.name) return;
        if (typeof take.onCompleteCallback !== "function") return;
        delete params.taskq;
        take.onCompleteCallback(params);
      });

      this.on("running", async (params) => {
        const onExecuteCallback = takeCallback || take.onExecuteCallback;
        if (taskName !== params.task.name) return;
        if (typeof onExecuteCallback !== "function") {
          this.log("error", "You must provide a callback to `taskq.take`");
        }

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
              queries.updateExecution({
                status: "success",
                executionId: params.execution.id,
                taskId: params.task.id,
                maxAttempts: this.maxAttempts,
              })
            )
            .catch(this.log("error"));
        } catch (err) {
          await params.log(err);
          this.pool
            .query(
              queries.updateExecution({
                status: "failure",
                executionId: params.execution.id,
                taskId: params.task.id,
                maxAttempts: this.maxAttempts,
              })
            )
            .catch(this.log("error"));
        }
      });
    });

    return take;
  }

  handler(cb) {
    return cb;
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
      this.log(
        "warn",
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

  async debug(taskNameOrTask, task) {
    task =
      typeof taskNameOrTask === "string"
        ? (task = { name: taskNameOrTask, ...task })
        : taskNameOrTask;

    const registeredTask = this.registeredTasks.find(
      ({ name }) => name === task.name
    );

    if (!registeredTask) return;

    const onExecuteCallback =
      registeredTask.callback || registeredTask.take.onExecuteCallback;

    const log = this.log.bind(this);

    const debugTaskQ = new Proxy(new Object(), {
      get(_, prop) {
        log("debug", `No-op: taskq.${prop} disabled in debugger`);
        return (...args) => {
          log("debug", `taskq.${prop} called with`, ...args);
        };
      },
    });

    const params = {
      context: task.context,
      params: task.params,
      task: {
        ...task,
        status: "running",
        locked: false,
        execute_at: new Date(),
        attempts: 1,
      },
      taskq: debugTaskQ,
      log: this.logger,
    };

    const dependencies =
      typeof this.dependencies === "function"
        ? await this.dependencies(params)
        : this.dependencies;

    onExecuteCallback({
      ...dependencies,
      ...params,
    });
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
            this.log("error", "Failed to process queue. Retrying...");
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
          backoffDelay: this.backoffDelay,
          backoffDecay: this.backoffDecay,
          concurrentExecutions: this.concurrency,
          maxAttempts: this.maxAttempts,
        })
      );

      const nextTask = rows[0];
      await this.updateTimedOutExecutions();
      await this.processLogs();

      if (
        nextTask &&
        !this.registeredTasks.find(({ name }) => name === nextTask.task_name)
      ) {
        this.log(
          "error",
          `No task handler defined for ${nextTask.task_name}. Create a hander using taskq.take("${nextTask.task_name}", callback).`
        );
        // @TODO - mark this execution as failed
      }
      if (this.started && nextTask) {
        await this.processQueue();
      }
    } catch (err) {
      this.log("error", err);
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
            queries.updateExecution({
              status: "timeout",
              executionId: timedOutExecution.id,
              taskId: timedOutExecution.task_id,
              maxAttempts: this.maxAttempts,
            })
          )
        )
      );
    } catch (err) {
      this.log("error", err);
    }
  }

  async processLogs() {
    if (this.logQ.length === 0) return;
    const logs = this.logQ;
    this.logQ = [];
    await this.pool.query(queries.insertLogs({ logs })).catch((err) => {
      this.logQ = [...logs, this.logQ];
      this.log("error", err);
    });
  }

  async setUpEventListeners() {
    this.notificationClient = await this.pool.connect();
    await this.notificationClient.query(queries.listen());

    this.notificationClient.on("notification", ({ channel, payload }) => {
      if (channel != "taskq") return;
      try {
        const message = JSON.parse(payload);
        this.subscribers.forEach(async ([event, subscriber]) => {
          const isEventNameMatch = event === message.event;
          const isStatusMatch =
            message.event === "status_change" && event === message.task.status;

          if (isEventNameMatch || isStatusMatch) {
            const params = await this.getExecutionParams(
              message.task,
              message.execution
            );
            subscriber(params);
          }
        });
      } catch (err) {
        this.log("error", "Failed to parse event", err);
      }
    });
  }

  setUpInfoLogging() {
    const logInfo = this.log("info");
    this.on("pending", ({ task }) => {
      logInfo(`Enqueued task "${task.name}" (task id: ${task.id})`);
    });
    this.on("running", ({ task }) => {
      logInfo(
        `Executing task "${task.name}" (execution id: ${task.execution_id})`
      );
    });
    this.on("timeout", ({ task }) => {
      logInfo(
        `Task "${task.name}" timed out after ${this.timeout} (execution id: ${task.execution_id})`
      );
    });
    this.on("failure", ({ task }) => {
      logInfo(
        `Task "${task.name}" failed to execute (execution id: ${task.execution_id})`
      );
    });
    this.on("success", ({ task }) => {
      logInfo(
        `Task "${task.name}" successfully executed (execution id: ${task.execution_id})`
      );
    });
    this.on("no-op", ({ task }) => {
      logInfo(`Already enqueued task "${task.name}" (task id: ${task.id})`);
    });
  }

  async stop() {
    if (this.started) {
      this.started = false;
      await this.processingPromise.catch(console.log);
      await this.notificationClient.release();
      await this.pool.end();
      this.log("info", "Stopped TaskQ");
    } else {
      this.log("info", "Can't stop TaskQ. Not currently running.");
    }
  }
}

module.exports = { PgTaskQ };
