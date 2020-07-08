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

it("times out", (done) => {
  let attempts = 0;
  let timeoutMock = jest.fn();

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
