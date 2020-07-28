const { client, connectionString, exec } = require("./utils");

beforeAll(() => {
  client.connect();
});

afterAll(() => {
  client.end();
});

it("Runs migrations", async () => {
  await exec(`./bin/up.js -f -c ${connectionString}`).catch(console.log);
  const result = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `);
  expect(result.rows.map((table) => table.table_name)).toEqual([
    "executions",
    "extended_tasks",
    "logs",
    "migrations",
    "tasks",
  ]);
});

it("Runs migrations in a provided schema", async () => {
  await exec(`./bin/up.js -f -c ${connectionString} -s schema_test`).catch(
    console.log
  );
  const result = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'schema_test'
    ORDER BY table_name
  `);
  expect(result.rows.map((table) => table.table_name)).toEqual([
    "executions",
    "extended_tasks",
    "logs",
    "migrations",
    "tasks",
  ]);
});

it("Clears the tasks queue", async () => {
  await client.query(`
    INSERT INTO tasks ("name") VALUES ('Test Task');
    INSERT INTO executions ("task_id") VALUES (1);
  `);
  await exec(`./bin/clear.js -f -c ${connectionString}`).catch(console.log);
  const result = await client.query(
    `SELECT t.*, e.* FROM tasks t, executions e`
  );
  expect(result.rowCount).toEqual(0);
});

it("Clears the tasks queue from a provided schema", async () => {
  await client.query(`
    INSERT INTO schema_test.tasks ("name") VALUES ('Test Task');
    INSERT INTO schema_test.executions ("task_id") VALUES (1);
  `);
  await exec(`./bin/clear.js -f -c ${connectionString} -s schema_test`).catch(
    console.log
  );
  const result = await client.query(
    `SELECT t.*, e.* FROM schema_test.tasks t, schema_test.executions e`
  );
  expect(result.rowCount).toEqual(0);
});
