const { setup } = require("./utils");
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
  taskq.take("Test Task", async ({ execution, log }) => {
    log(null);
    log("one");
    log({ two: 3 });
    log(["four", "five"]);
    log(6);
    await taskq.processingPromise;
    const result = await taskq.pool.query(
      sql`select message from logs where execution_id = ${execution.id}`
    );
    expect(result.rows).toEqual([
      { message: null },
      { message: "one" },
      { message: { two: 3 } },
      { message: ["four", "five"] },
      { message: 6 },
    ]);
    done();
  });
});

it("logs errors passed explicitly to logger", (done) => {
  taskq.enqueue("New Task");
  taskq.take("New Task", async ({ execution, log }) => {
    log(new Error("Something went wrong"));
    await taskq.processingPromise;
    const result = await taskq.pool.query(
      sql`select message from logs where execution_id = ${execution.id}`
    );
    expect(result.rows[0].message.message).toEqual("Something went wrong");
    done();
  });
});

it("logs error throw within a task execution", (done) => {
  taskq.enqueue("Error Task");
  taskq
    .take("Error Task", () => {
      throw new Error("Something went wrong in the task");
    })
    .onFailure(async ({ execution }) => {
      await taskq.processingPromise;
      const result = await taskq.pool.query(
        sql`select message from logs where execution_id = ${execution.id}`
      );
      expect(result.rows[0].message.message).toEqual(
        "Something went wrong in the task"
      );
      done();
    });
});
