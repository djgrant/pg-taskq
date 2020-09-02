const df = require("date-fns/fp");
const { setup, pause } = require("./utils");

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
  taskq.take("Test Task", () => {});
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
  taskq.take("Test pending", () => {});
  taskq.on("pending", ({ task }) => {
    if (task.name === "Test pending") {
      expect(task.status).toEqual("pending");
      done();
    }
  });
});

test("Scheduled event", (done) => {
  taskq.schedule({
    name: "Test scheduled",
    executeIn: "10 minutes",
  });
  taskq.take("Test scheduled", () => {});
  taskq.on("scheduled", ({ task }) => {
    if (task.name === "Test scheduled") {
      expect(task.status).toEqual("scheduled");
      done();
    }
  });
});

test("Timeout event", (done) => {
  taskq.enqueue("Test timeout");
  taskq.take("Test timeout", async () => {
    await pause(1000);
  });
  taskq.on("timeout", ({ task }) => {
    if (task.name === "Test timeout") {
      expect(task.status).toEqual("timeout");
      done();
    }
  });
});

test("Locked event", (done) => {
  taskq.enqueue("Test locked");
  taskq.take("Test locked", async () => {
    await pause(1000);
  });
  taskq.on("locked", ({ task }) => {
    if (task.name === "Test locked") {
      expect(task.status).toBe("timeout");
      expect(task.locked).toBe(true);
      done();
    }
  });
});

test.todo(
  "It still succeeds even after timeout if the process is not cancelled"
);
