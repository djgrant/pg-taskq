const { TaskQ } = require("..");
const { setup } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({
    schema: "execution_test",
    dependencies: { dep: 1 },
  });
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

it("Can enqueue sub tasks", (done) => {
  taskq.enqueue("Parent Task");
  taskq.take("Parent Task", ({ taskq }) => {
    taskq.enqueue("Child Task");
  });
  taskq.take("Child Task", ({ task }) => {
    expect(task.parent_id).toEqual(expect.any(Number));
    done();
  });
});
