const { setup } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({
    schema: "failure_test",
    timeout: "0.1 seconds",
    maxAttempts: 4,
  });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("A task is locked after reaching max attempts", (done) => {
  const executeMock = jest.fn(() => {
    throw new Error();
  });
  const failureMock = jest.fn();
  taskq.enqueue("Lock Task");
  taskq
    .take("Lock Task")
    .onExecute(executeMock)
    .onFailure(failureMock)
    .onLocked(({ task }) => {
      expect(executeMock).toBeCalledTimes(4);
      expect(failureMock).toBeCalledTimes(4);
      expect(task.status).toEqual("failure");
      done();
    });
});

test("An execution times out", (done) => {
  const timeoutMock = jest.fn();
  const executeMock = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 30000);
      })
  );
  taskq.enqueue("Timeout Task");
  taskq
    .take("Timeout Task")
    .onExecute(executeMock)
    .onTimeout(timeoutMock)
    .onLocked(() => {
      expect(executeMock).toBeCalledTimes(4);
      expect(timeoutMock).toBeCalledTimes(4);
      done();
    });
});
