const { PgTaskQ } = require("../");

const taskq = new PgTaskQ({
  logLevel: "debug",
  processQueueEvery: 2000,
  dependencies: {},
  maxAttempts: 2,
  backoffDelay: "10 seconds",
  backoffDecay: "linear",
  schema: "taskq",
});

taskq.schedule({
  name: "daily-task",
  executeTodayAt: "00:00",
  params: {},
});

taskq.enqueue("test task");

taskq
  .take("daily-task")
  .onFirstAttempt(({ task }) => {
    taskq.scheduleAgain(task, { add: "1 day" });
  })
  .onExecute(async ({ taskq }) => {
    await taskq.enqueue({
      name: "async-task",
      params: {},
    });
  });

taskq
  .take("async-task")
  .onExecute(async ({ log, params }) => {
    log("Running task");
    log(JSON.stringify(params));
    await Promise.resolve();
  })
  .onSuccess(({ task, taskq }) => {
    taskq.scheduleAgain(task, { executeIn: "15 seconds" });
    taskq.schedule({
      name: "deeply-nested-task",
      executeIn: "1 min",
    });
  });

taskq
  .take("deeply-nested-task")
  .onExecute(() => {
    console.log("Executing deeply nested task");
  })
  .onFailure(({ taskq }) => {
    taskq.enqueue({ name: "email-me", params: { task, status: failure } });
  });

taskq.on("success", (task) => {});
taskq.on("failure", (task) => {});
taskq.on("running", (task) => {});

taskq.start();
