const { setup } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({ schema: "events_test" });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("Running event", (done) => {
  taskq.enqueue("Test Task");
  taskq.on("running", (task) => {
    if (task.name === "Test Task") done();
  });
});

test("Success event", (done) => {
  taskq.enqueue("Test success");
  taskq.take("Test success", () => {});
  taskq.on("success", (task) => {
    if (task.name === "Test success") done();
  });
  taskq.on("failure", (task) => {
    if (task.name === "Test Task")
      done(new Error("Failure handler should not be called"));
  });
});

test("Failure event", (done) => {
  taskq.enqueue("Test failure");
  taskq.take("Test failure", () => {
    throw new Error("Task failed");
  });
  taskq.on("success", (task) => {
    if (task.name === "Test failure")
      done(new Error("Success handler should not be called"));
  });
  taskq.on("failure", (task) => {
    if (task.name === "Test failure") done();
  });
});
