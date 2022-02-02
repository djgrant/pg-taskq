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

test("matches strings exactly", (done) => {
  taskq.enqueue("Test execution");
  taskq.take("execution", () => {
    done(new Error("Should not have matched"));
  });

  pause(100);

  taskq.enqueue("Test execution");
  taskq.take("Test execution", () => {
    done();
  });
});
