const pg = require("pg");
const { connectionString, setup } = require("./utils");

let taskq;

afterEach(async () => {
  await taskq.stop();
});

test("Passing a connection pool", async (done) => {
  const pool = new pg.Pool({ connectionString });
  taskq = await setup({
    schema: "pool_test",
    db: undefined,
    pool,
  });
  taskq.start();
  taskq.enqueue("Task");
  taskq.take("Task", () => {
    done();
  });
});

test("Passing dependencies", async (done) => {
  const dep = () => {};
  taskq = await setup({
    schema: "dependencies_test",
    dependencies: { dep },
  });
  taskq.start();
  taskq.enqueue("Task");
  taskq.take("Task", async (opts) => {
    expect(opts.dep).toBe(dep);
    done();
  });
});

test("Passing a dependencies factory function", async (done) => {
  taskq = await setup({
    schema: "dependencies_test",
    dependencies: (params) => ({
      getDependencyParams: () => params,
    }),
  });
  taskq.start();
  taskq.enqueue({
    name: "Task",
    context: { a: 1 },
    params: { b: 2 },
  });
  taskq.take("Task", async ({ getDependencyParams, ...executionParams }) => {
    expect(getDependencyParams()).toEqual(executionParams);
    done();
  });
});
