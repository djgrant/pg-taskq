const { setup } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({ schema: "execution_test", timeout: "0.1s" });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

it("caclulates children stats", (done) => {
  taskq.enqueue("Outer task");

  taskq
    .take("Outer task")
    .onExecute(async ({ taskq }) => {
      await taskq.enqueue("Inner task");
      await taskq.enqueue("Inner task 2");
    })
    .onSuccess(({ task }) => {
      expect(task).toMatchObject({
        children_stats: {
          total: 2,
          pending: 2,
          locked: 0,
        },
      });
    })
    .onComplete(({ task }) => {
      expect(task).toMatchObject({
        children_stats: {
          total: 2,
          success: 1,
          failure: 1,
          locked: 2,
        },
      });
      done();
    });

  taskq.take("Inner task", () => {});
  taskq.take("Inner task 2", () => {
    throw new Error();
  });
});

it("calculates descendant stats", (done) => {
  taskq.enqueue("Depth 1");

  taskq.take("Depth 2", async ({ taskq }) => {
    await taskq.enqueue("Depth 3");
  });
  taskq.take("Depth 3", async ({ taskq }) => {
    await taskq.enqueue("Depth 4");
  });
  taskq.take("Depth 4", () => {
    throw new Error();
  });

  taskq
    .take("Depth 1")
    .onExecute(async ({ taskq }) => {
      await taskq.enqueue("Depth 2");
    })
    .onComplete(({ task }) => {
      expect(task.children_stats).toEqual({
        total: 1,
        locked: 1,
        success: 1,
        failure: 0,
        pending: 0,
        running: 0,
        timeout: 0,
        scheduled: 0,
      });
      expect(task.descendants_stats).toEqual({
        total: 3,
        locked: 3,
        success: 2,
        failure: 1,
        pending: 0,
        running: 0,
        timeout: 0,
        scheduled: 0,
      });
      done();
    });
});
