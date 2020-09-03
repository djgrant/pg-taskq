const { setup, pause } = require("./utils");
const { PgTaskQ } = require("pg-taskq");

let taskq;

describe("Callback form", () => {
  beforeAll(async () => {
    taskq = await setup({ schema: "execution_test", timeout: "0.1s" });
    taskq.start();
  });

  afterAll(async () => {
    await taskq.stop();
  });

  test("An enqueued task is executed", (done) => {
    taskq.enqueue("Test execution");
    taskq.take("Test execution", () => done());
  });

  it("Is executed with params", (done) => {
    taskq.enqueue("Test params", { a: 1 });
    taskq.take("Test params", ({ params }) => {
      expect(params).toEqual({ a: 1 });
      done();
    });
  });

  it("Is executed with context", (done) => {
    taskq.enqueue({
      name: "Test context",
      params: { a: 1 },
      context: { b: 2 },
    });
    taskq.take("Test context", ({ context, params }) => {
      expect(params).toEqual({ a: 1 });
      expect(context).toEqual({ b: 2 });
      done();
    });
  });

  it("Is passed the task and execution rows", (done) => {
    taskq.enqueue("Test task row");
    taskq.take("Test task row", ({ task, execution }) => {
      expect(task).toMatchObject({
        attempts: 1,
        context: {},
        execute_at: expect.any(String),
        id: expect.any(Number),
        locked: false,
        name: "Test task row",
        params: {},
        parent_id: null,
        status: "running",
      });
      expect(execution).toMatchObject({
        id: expect.any(Number),
        status: "running",
        task_id: task.id,
        started_at: expect.any(String),
        finished_at: null,
      });
      done();
    });
  });

  it("Is passed a TaskQ instance", (done) => {
    taskq.enqueue("Test TaskQ instance");
    taskq.take("Test TaskQ instance", ({ taskq }) => {
      expect(taskq).toBeInstanceOf(PgTaskQ);
      done();
    });
  });

  it("Can enqueue sub tasks", (done) => {
    let parentId;
    taskq.enqueue("Parent Task");
    taskq.take("Parent Task", ({ task, taskq }) => {
      parentId = task.id;
      taskq.enqueue("Child Task");
    });
    taskq.take("Child Task", ({ task }) => {
      expect(task.parent_id).toEqual(parentId);
      done();
    });
  });

  it("Takes multiple tasks", (done) => {
    let calls = 0;
    taskq.enqueue("Test multiple tasks 1");
    taskq.enqueue("Test multiple tasks 2");
    taskq.take(["Test multiple tasks 1", "Test multiple tasks 2"], () => {
      if (++calls < 2) return;
      done();
    });
  });
});

describe("Chained methods", () => {
  let taskq;

  beforeAll(async () => {
    taskq = await setup({ schema: "execution_test", timeout: "0.1s" });
    taskq.start();
  });

  afterAll(async () => {
    await taskq.stop();
  });

  test("onExecute", (done) => {
    taskq.enqueue("Test onExecute");
    taskq.take("Test onExecute").onExecute(() => done());
  });

  test("onSuccess", (done) => {
    taskq.enqueue("Test onSuccess");
    taskq
      .take("Test onSuccess")
      .onExecute(() => {})
      .onSuccess(() => done());
  });

  test("onFirstAttempt", (done) => {
    const firstAttemptCallback = jest.fn();
    let attempts = 0;
    taskq.enqueue("Test onFirstAttempt");
    taskq
      .take("Test onFirstAttempt")
      .onExecute(() => Promise.reject())
      .onFailure(() => {
        if (++attempts === 2) {
          expect(firstAttemptCallback).toHaveBeenCalledTimes(1);
          done();
        }
      })
      .onFirstAttempt(firstAttemptCallback);
  });

  test("onFailure", (done) => {
    taskq.enqueue("Test onFailure");
    taskq
      .take("Test onFailure")
      .onExecute(() => {
        throw new Error("Failed task");
      })
      .onSuccess(() => done(new Error("Should not succeed")))
      .onFailure(() => done());
  });

  test("onComplete", (done) => {
    taskq.enqueue("Outer task");
    taskq
      .take("Outer task")
      .onExecute(({ taskq }) => {
        taskq.enqueue("Inner task");
      })
      .onComplete(() => {
        done();
      });
    taskq.take("Inner task", () => {});
  });

  test("async success", (done) => {
    let testValue;
    taskq.enqueue("Test async success");
    taskq
      .take("Test async success")
      .onExecute(async ({ testLogger }) => {
        await Promise.resolve();
        testValue = 42;
      })
      .onSuccess(() => {
        expect(testValue).toBe(42);
        done();
      });
  });

  test("async failure", (done) => {
    taskq.enqueue("Test async failure");
    taskq
      .take("Test async failure")
      .onExecute(async () => {
        await Promise.reject();
      })
      .onSuccess(() => done(new Error("Should not succeed")))
      .onFailure(() => done());
  });

  test("task succeeds even after timeout if the execution process continues running", (done) => {
    const timeoutMock = jest.fn();
    taskq.enqueue("Test locked success");
    taskq
      .take("Test locked success", async () => {
        await pause(150);
      })
      .onTimeout(timeoutMock)
      .onSuccess(() => {
        expect(timeoutMock).toBeCalled();
        done();
      });
  });
});
