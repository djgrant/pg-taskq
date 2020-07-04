const cp = require("child_process");
const util = require("util");
const pg = require("pg");

const exec = util.promisify(cp.exec);

const connectionString = process.env.DATABASE_URL;
const client = new pg.Client({ connectionString });

beforeAll(() => {
  client.connect();
});

afterAll(() => {
  client.end();
});

it("Runs migrations", async () => {
  await exec(`./bin/up.js -f -c ${connectionString}`);
  const result = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  expect(result.rows.map((table) => table.table_name)).toEqual([
    "migrations",
    "tasks_extended",
    "tasks",
    "executions",
  ]);
});

it("Runs migrations in a provided schema", async () => {
  await exec(`./bin/up.js -f -c ${connectionString} -s taskq`);
  const result = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'taskq'
  `);
  expect(result.rows.map((table) => table.table_name)).toEqual([
    "migrations",
    "tasks_extended",
    "tasks",
    "executions",
  ]);
});

it("Clears the tasks queue", async () => {
  await client.query(`
    INSERT INTO tasks ("name") VALUES ('Test Task');
    INSERT INTO executions ("task_id") VALUES (1);
  `);
  await exec(`./bin/clear.js -f -c ${connectionString}`);
  const result = await client.query(
    `SELECT t.*, e.* FROM tasks t, executions e`
  );
  expect(result.rowCount).toEqual(0);
});

it("Clears the tasks queue from a provided schema", async () => {
  await client.query(`
    INSERT INTO taskq.tasks ("name") VALUES ('Test Task');
    INSERT INTO taskq.executions ("task_id") VALUES (1);
  `);
  await exec(`./bin/clear.js -f -c ${connectionString} -s taskq`);
  const result = await client.query(
    `SELECT t.*, e.* FROM taskq.tasks t, taskq.executions e`
  );
  expect(result.rowCount).toEqual(0);
});
