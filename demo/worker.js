const { PgTaskQ } = require("../");

const today = new Date();
today.setHours(0, 0, 0, 0);

const taskq = new PgTaskQ({
  logLevel: "warn",
  processQueueEvery: 1500,
  dependencies: {},
  maxAttempts: 2,
  backoffDelay: "10 seconds",
  backoffDecay: "linear",
});

taskq.schedule({
  task: "daily-task",
  executeAt: today,
  executeAgainEvery: "1 day",
});

taskq.process("daily-task", async function ({ taskq }) {
  const asyncTask = await taskq.enqueue({
    task: "async-task",
    params: {},
  });

  asyncTask.on("failure", (task) => {
    console.log("async-task failed!", task.params);
  });

  asyncTask.on("success", () => {
    taskq.enqueue({ task: "deeply-nested-task" });
  });
});

taskq.process("async-task", async function ({ log, params, taskq }) {
  log("Running task");
  log(JSON.stringify(params));
  await Promise.resolve();
});

taskq.process("deeply-nested-task", () => {
  throw new Error("task failed");
});

taskq.on("success", (task) => {
  console.log(`Task "${task.name}" was successful`);
});

taskq.on("failure", (task) => {
  console.log(`Task "${task.name}" failed`);
});

taskq.on("running", (task) => {
  console.log(`Task "${task.name}" is running`);
});

taskq.run();
