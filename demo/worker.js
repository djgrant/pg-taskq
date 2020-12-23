const { PgTaskQ } = require("pg-taskq");

const taskq = new PgTaskQ({
  logLevel: "debug",
  processQueueEvery: 2000,
  dependencies: {},
  maxAttempts: 2,
  backoffDelay: "10 seconds",
  backoffDecay: "linear",
  timeout: "5 seconds",
  schema: "taskq",
});

taskq.start();

taskq.schedule({
  name: "Daily task",
  executeTodayAt: "00:00",
  params: {},
});

taskq.enqueue("Timeout Task");

taskq
  .take("Daily task")
  .onFirstAttempt(({ task }) => {
    taskq.scheduleAgain(task, { add: "1 day" });
  })
  .onExecute(async ({ taskq }) => {
    await taskq.enqueue({
      name: "Async task",
      params: {},
    });
  });

taskq
  .take("Async task")
  .onExecute(async ({ log, params }) => {
    log("Running task");
    log(params);
    await Promise.resolve();
  })
  .onSuccess(({ task, taskq }) => {
    taskq.scheduleAgain(task, { executeIn: "15 seconds" });
    taskq.schedule({
      name: "Deeply nested task",
      executeIn: "1 min",
    });
  });

taskq
  .take("Deeply nested task", () => {
    console.log("Executing deeply nested task");
  })
  .onFailure(({ taskq }) => {
    taskq.enqueue({ name: "email-me", params: { task, status: failure } });
  });

taskq
  .take("Timeout Task", () => new Promise(() => {}))
  .onTimeout(({ log }) => {
    log("Task timed out");
  });

taskq.enqueue("Outer task");

taskq
  .take("Outer task")
  .onExecute(async (self) => {
    await self.taskq.enqueue("Inner task", { rerun: true });
  })
  .onComplete((self) => {
    self.log("=== Outer complete");
  });

taskq.take("Inner task", async (self) => {
  if (self.params.rerun) {
    const parent = await self.getParent();
    await parent.taskq.enqueue("Inner task", { rerun: false });
  }
});

taskq.take("Inner task", async (self) => {
  if (self.params.rerun) {
    await self.enqueueCopy({
      params: { rerun: false },
    });
  }
});

taskq.on("success", (task) => {});
taskq.on("failure", (task) => {});
taskq.on("running", (task) => {});
taskq.on("pending", (task) => {});
taskq.on("timeout", (task) => {});
