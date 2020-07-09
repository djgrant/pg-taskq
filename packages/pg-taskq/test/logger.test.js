const { client, setup } = require("./utils");
const sql = require("sql-template-strings");

let taskq;

beforeAll(async () => {
  taskq = await setup({ schema: "logger_test" });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

it("logs various types of data in order", (done) => {
  taskq.enqueue("Test Task");
  taskq.take("Test Task", async ({ task, log }) => {
    log(null);
    log("one");
    log({ two: 3 });
    log(["four", "five"]);
    log(6);
    await taskq.processingPromise;
    const result = await taskq.pool.query(
      sql`SELECT logs FROM executions WHERE id = ${task.id}`
    );
    expect(result.rows[0].logs).toEqual(
      "null\n" + '"one"\n' + '{"two":3}\n' + '["four","five"]\n' + "6\n"
    );
    done();
  });
});

it("logs errors passed explicitly to logger", (done) => {
  taskq.enqueue("New Task");
  taskq.take("New Task", async ({ task, log }) => {
    log(new Error("Something went wrong"));
    await taskq.processingPromise;
    const result = await taskq.pool.query(
      sql`SELECT logs FROM executions WHERE id = ${task.id}`
    );
    expect(result.rows[0].logs).toMatch(/^Error: Something went wrong/);
    done();
  });
});

it("logs error throw within a task execution", (done) => {
  taskq.enqueue("Error Task");
  taskq
    .take("Error Task", () => {
      throw new Error("Something went wrong");
    })
    .onFailure(async ({ task }) => {
      await taskq.processingPromise;
      const result = await taskq.pool.query(
        sql`SELECT logs FROM executions WHERE id = ${task.id}`
      );
      expect(result.rows[0].logs).toMatch(/^Error: Something went wrong/);
      done();
    });
});
