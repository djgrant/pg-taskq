const df = require("date-fns/fp");
const { setup } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({
    schema: "events_test",
    timeout: "0.1 seconds",
    maxAttempts: 2,
  });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("Running event", (done) => {
  taskq.enqueue("Test Task");
  taskq.on("running", ({ task }) => {
    if (task.name === "Test Task") {
      expect(task.status).toEqual("running");
      done();
    }
  });
});

test("Success event", (done) => {
  taskq.enqueue("Test success");
  taskq.take("Test success", () => {});
  taskq.on("success", ({ task }) => {
    if (task.name === "Test success") {
      expect(task.status).toEqual("success");
      done();
    }
  });
});

test("Failure event", (done) => {
  taskq.enqueue("Test failure");
  taskq.take("Test failure", () => {
    throw new Error("Task failed");
  });
  taskq.on("failure", ({ task }) => {
    if (task.name === "Test failure") {
      expect(task.status).toEqual("failure");
      done();
    }
  });
});

test("Pending event", (done) => {
  taskq.enqueue("Test pending");
  taskq.on("pending", ({ task }) => {
    if (task.name === "Test pending") {
      expect(task.status).toEqual("pending");
      done();
    }
  });
});

test("Timeout event", (done) => {
  taskq.enqueue("Test timeout");
  taskq.on("timeout", ({ task }) => {
    if (task.name === "Test timeout") {
      expect(task.status).toEqual("timeout");
      done();
    }
  });
});

test("Locked event", (done) => {
  taskq.enqueue("Test locked");
  taskq.on("locked", ({ task }) => {
    if (task.name === "Test locked") {
      expect(task.status).toBe("timeout");
      expect(task.locked).toBe(true);
      done();
    }
  });
});

test("No-op event", async (done) => {
  const time = df.addDays(1, new Date());
  const { id } = await taskq.schedule({
    name: "Test no-op",
    executeAtDateTime: time,
  });
  taskq.schedule({
    name: "Test no-op",
    executeAtDateTime: time,
  });
  taskq.on("no-op", ({ task }) => {
    if (task.name === "Test no-op") {
      expect(id).toEqual(task.id);
      done();
    }
  });
});
