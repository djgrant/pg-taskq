const { setup } = require("./utils");

jest.setTimeout(15000);

let taskq;

beforeAll(async () => {
  taskq = await setup({
    schema: "stats_test",
    timeout: "0.1s",
    maxAttempts: 2,
  });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

it("caclulates children stats", (done) => {
  taskq.enqueue("Outer task");

  taskq
    .take("Outer task")
    .onFirstAttempt(async ({ taskq }) => {
      let i = 10;
      while (i--) {
        await taskq.enqueue("Inner task", { i });
      }
    })
    .onExecute(() => {})
    .onComplete(async ({ getStats }) => {
      const { children } = await getStats();
      expect(children).toMatchObject({
        total: 10,
        locked: 10,
        failure: 5,
        success: 5,
        pending: 0,
      });
      done();
    });

  taskq.take("Inner task", ({ params }) => {
    if (params.i % 2 === 0) {
      throw new Error();
    }
  });
});

it("calculates descendant stats", (done) => {
  taskq.enqueue("Depth 1");

  taskq.on("timeout", ({ task, execution }) => {
    console.log(task.id, task.name, task.status, execution);
  });

  taskq.take("Depth 2", async ({ taskq }) => {
    let i = 5;
    while (i--) {
      taskq.enqueue("Depth 3", { i });
    }
  });

  taskq.take("Depth 3", async ({ taskq, params }) => {
    let i = 5;
    while (i--) {
      taskq.enqueue("Depth 4", { i, j: params.i });
    }
  });

  taskq.take("Depth 4", () => {
    throw new Error();
  });

  taskq
    .take("Depth 1")
    .onExecute(async ({ taskq }) => {
      await taskq.enqueue("Depth 2");
    })
    .onComplete(async ({ getStats }) => {
      const { children, descendants } = await getStats();
      expect(children).toEqual({
        total: 1,
        locked: 1,
        success: 1,
        failure: 0,
        pending: 0,
        running: 0,
        timeout: 0,
        scheduled: 0,
      });
      expect(descendants).toEqual({
        total: 31,
        locked: 31,
        success: 6,
        failure: 25,
        pending: 0,
        running: 0,
        timeout: 0,
        scheduled: 0,
      });
      done();
    });
});
