const { setup, pause } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({ schema: "scheduling_test" });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("matches regular expressions", (done) => {
  taskq.enqueue("Test execution");
  taskq.take(/execution$/, () => done());
});

test("matches strings exactly", async (done) => {
  taskq.enqueue("Test execution");
  taskq.take("execution", () => {
    done(new Error("Should not have matched"));
  });

  await pause(50);

  taskq.enqueue("Test execution");
  taskq.take("Test execution", () => {
    done();
  });
});
