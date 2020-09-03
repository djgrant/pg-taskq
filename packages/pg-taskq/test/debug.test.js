const { setup } = require("./utils");

let taskq;
const logger = jest.fn();

beforeAll(async () => {
  taskq = await setup({
    schema: "debug_test",
    dependencies: () => Promise.resolve({ dep: 1 }),
    logger,
    logLevel: "debug",
  });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("A debug task is executed", (done) => {
  taskq.take("Test debug", ({ dep, log, params, context, task }) => {
    expect(dep).toEqual(1);
    expect(params).toEqual({ p: 1 });
    expect(context).toEqual({ c: 1 });
    expect(task).toMatchObject({
      status: "running",
      attempts: 1,
      locked: false,
    });
    expect(log).toBe(logger);
    done();
  });
  taskq.debug("Test debug", { params: { p: 1 }, context: { c: 1 } });
});

test("A debug task is executed (onExecute method)", (done) => {
  taskq.take("Test debug onExecute").onExecute(() => done());
  taskq.debug("Test debug onExecute");
});

test("TaskQ is disabled in debug tasks", (done) => {
  taskq.take("Test debug taskq", ({ taskq }) => {
    taskq.anything(1, 2, 3);
    expect(logger).nthCalledWith(
      1,
      "[TaskQ:debug]:",
      "No-op: taskq.anything disabled in debugger"
    );
    expect(logger).nthCalledWith(
      2,
      "[TaskQ:debug]:",
      "taskq.anything called with",
      1,
      2,
      3
    );
    done();
  });
  taskq.debug("Test debug taskq");
});
