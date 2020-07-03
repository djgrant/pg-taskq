const { exec } = require("child_process");
const { TaskQ } = require("../");

const connectionString = process.env.DATABASE_URL;

const taskq = new TaskQ({
  db: { connectionString },
});

beforeAll((done) => {
  exec(`./bin/up.js -f -c ${connectionString}`, done);
  taskq.run();
});

afterAll(() => {
  taskq.stop();
});

test("An enqueued task is executed", (done) => {
  taskq.enqueue("Test Task");
  taskq.take("Test Task", () => done());
});
