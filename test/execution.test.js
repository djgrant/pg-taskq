const cp = require("child_process");
const util = require("util");
const { TaskQ } = require("..");

const exec = util.promisify(cp.exec);
const connectionString = process.env.DATABASE_URL;

const taskq = new TaskQ({
  db: { connectionString },
  schema: "execution_test",
  processQueueEvery: 100,
  dependencies: { dep: 1 },
});

beforeAll(async () => {
  await exec(`./bin/up.js -f -c ${connectionString} -s execution_test`);
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("An enqueued task is executed", (done) => {
  taskq.enqueue("Test Task");
  taskq.take("Test Task", () => done());
});

it("Is executed with params", (done) => {
  taskq.enqueue("Test Task 2", { a: 1 });
  taskq.take("Test Task 2", ({ params }) => {
    expect(params).toEqual({ a: 1 });
    done();
  });
});

it("Is executed with context", (done) => {
  taskq.enqueue({
    name: "Test Task 3",
    params: { a: 1 },
    context: { b: 2 },
  });
  taskq.take("Test Task 3", ({ context, params }) => {
    expect(params).toEqual({ a: 1 });
    expect(context).toEqual({ b: 2 });
    done();
  });
});

it("Is executed with dependencies", (done) => {
  taskq.enqueue({
    name: "Test Task 4",
  });
  taskq.take("Test Task 4", ({ dep }) => {
    expect(dep).toEqual(1);
    done();
  });
});

it("Is passed the task row", (done) => {
  taskq.enqueue("Test Task 5");
  taskq.take("Test Task 5", ({ task }) => {
    expect(task).toMatchObject({
      attempts: 1,
      context: {},
      execute_at: expect.any(String),
      execution_id: expect.any(Number),
      id: expect.any(Number),
      last_executed: expect.any(String),
      locked: false,
      name: "Test Task 5",
      params: {},
      parent_id: null,
      status: "running",
    });
    done();
  });
});

it("Is passed a TaskQ instance", (done) => {
  taskq.enqueue("Test Task 6");
  taskq.take("Test Task 6", ({ taskq }) => {
    expect(taskq).toBeInstanceOf(TaskQ);
    done();
  });
});
