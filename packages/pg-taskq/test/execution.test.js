const { setup, pause } = require("./utils");
const { PgTaskQ } = require("@djgrant/pg-taskq");

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

  it("Can update its own context", (done) => {
    taskq.enqueue({
      name: "Test updating context",
      context: { a: 1, b: 2 },
    });
    taskq
      .take("Test updating context", async ({ updateContext }) => {
        const newContext = await updateContext({ a: 2 });
        expect(newContext).toEqual({ a: 2, b: 2 });
      })
      .onSuccess(({ context }) => {
        expect(context).toEqual({ a: 2, b: 2 });
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

  it("Can enqueue a copy of itself", (done) => {
    let childTaskCalls = 0;
    taskq.enqueue("Parent Task 2");
    taskq
      .take("Parent Task 2")
      .onExecute(async (self) => {
        await self.taskq.enqueue("Child Task 2", { rerun: true });
      })
      .onComplete(() => {
        expect(childTaskCalls).toBe(2);
        done();
      });

    taskq.take("Child Task 2", async (self) => {
      childTaskCalls++;
      if (self.params.rerun) {
        await self.enqueueCopy({
          params: { rerun: false },
        });
      }
    });
  });

  it("Can traverse up to its parent task", (done) => {
    let childTaskCalls = 0;
    taskq.enqueue("Parent Task 3");
    taskq
      .take("Parent Task 3")
      .onExecute(async (self) => {
        await self.taskq.enqueue("Child Task 3", { rerun: true });
      })
      .onComplete(() => {
        expect(childTaskCalls).toBe(2);
        done();
      });

    taskq.take("Child Task 3", async (self) => {
      childTaskCalls++;
      if (self.params.rerun) {
        const parent = await self.getParent();
        await parent.taskq.enqueue("Child Task 3", { rerun: false });
      }
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
    const innerTaskMock = jest.fn();
    taskq.enqueue("Outer task");
    taskq
      .take("Outer task")
      .onExecute(async ({ taskq }) => {
        await taskq.enqueue("Inner task");
      })
      .onComplete(() => {
        expect(innerTaskMock).toBeCalledTimes(1);
        done();
      });
    taskq.take("Inner task", innerTaskMock);
  });

  test("onBeforeComplete", (done) => {
    let attempts = 2;
    const oneOffChildMock = jest.fn();
    const repeatedChildMock = jest.fn();

    taskq.enqueue("onBeforeComplete");

    taskq
      .take("onBeforeComplete")
      .onExecute((self) => {
        self.taskq.enqueue("One-off child task");
      })
      .onBeforeComplete(async (self) => {
        if (!attempts--) return;
        await self.taskq.enqueue("Repeated child task");
      })
      .onComplete(() => {
        expect(oneOffChildMock).toBeCalledTimes(1);
        expect(repeatedChildMock).toBeCalledTimes(2);
        done();
      });

    taskq.take("One-off child task", oneOffChildMock);
    taskq.take("Repeated child task", repeatedChildMock);
  });

  test("async success", (done) => {
    let testValue;
    taskq.enqueue("Test async success");
    taskq
      .take("Test async success")
      .onExecute(async () => {
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
