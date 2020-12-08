const { setup, pause } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({
    schema: "events_test",
    timeout: "0.3 seconds",
    maxAttempts: 2,
  });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("running event", (done) => {
  taskq.take("Test Task", () => {});
  taskq.enqueue("Test Task");
  taskq.on("running", ({ task }) => {
    if (task.name === "Test Task") {
      expect(task.status).toEqual("running");
      done();
    }
  });
});

test("success event", (done) => {
  taskq.enqueue("Test success");
  taskq.take("Test success", () => {});
  taskq.on("success", ({ task }) => {
    if (task.name === "Test success") {
      expect(task.status).toEqual("success");
      done();
    }
  });
});

test("failure event", (done) => {
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

test("pending event", (done) => {
  taskq.enqueue("Test pending");
  taskq.take("Test pending", () => {});
  taskq.on("pending", ({ task }) => {
    if (task.name === "Test pending") {
      expect(task.status).toEqual("pending");
      done();
    }
  });
});

test("scheduled event", (done) => {
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

test("timeout event", (done) => {
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

test("locked event", (done) => {
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

test("complete event", (done) => {
  const innerTaskMock = jest.fn();
  taskq.enqueue("Outer task");
  taskq.take("Outer task", ({ taskq }) => {
    taskq.enqueue("Inner task");
  });
  taskq.take("Inner task", innerTaskMock);
  taskq.on("complete", ({ task }) => {
    if (task.name === "Outer task") {
      expect(innerTaskMock).toBeCalled();
      expect(task.status).toBe("success");
      done();
    }
  });
});

test("complete event, contrived", async (done) => {
  const taskMock = jest.fn();

  taskq.enqueue("Root task");

  taskq
    .take("Root task")
    .onFirstAttempt(async ({ taskq: subTaskq }) => {
      await taskq.enqueue("Sibling task");
      await subTaskq.enqueue("Child task 1");
    })
    .onExecute(async ({ taskq }) => {
      await taskq.enqueue("Child task 2");
      await taskq.enqueue("Child task 3");
    })
    .onComplete(async ({ task, getStats }) => {
      const stats = await getStats();
      expect(task.locked).toEqual(true);
      expect(stats.children.failure).toEqual(1);
      expect(stats.children.total).toEqual(3);
      expect(stats.descendants.total).toEqual(4);
      expect(taskMock).toBeCalledTimes(1);
      done();
    });

  taskq.take("Sibling task", () => {});
  taskq.take("Child task 1", () => {});

  taskq.take("Child task 2", () => {
    throw new Error("Error");
  });

  taskq.take("Child task 3", ({ taskq }) => {
    taskq.enqueue("Grandchild task");
  });

  taskq.take("Grandchild task", taskMock);
});
