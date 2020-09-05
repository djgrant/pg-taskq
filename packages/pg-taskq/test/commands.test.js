const { getPool, connectionString, exec } = require("./utils");

const pool = getPool();

afterAll(async () => {
  await pool.end();
});

it("Runs migrations", async () => {
  await exec(`./bin/up.js -f -c ${connectionString}`).catch(console.log);
  const result = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
  expect(result.rows.map((table) => table.table_name)).toEqual([
    "executions",
    "logs",
    "migrations",
    "task_stats",
    "tasks",
  ]);
});

it("Clears the tasks queue", async () => {
  await pool.query(`
      INSERT INTO tasks ("name") VALUES ('Test Task');
      INSERT INTO executions ("task_id") VALUES (1);
    `);
  await exec(`./bin/clear.js -f -c ${connectionString}`).catch(console.log);
  const result = await pool.query(`SELECT t.*, e.* FROM tasks t, executions e`);
  expect(result.rowCount).toEqual(0);
});

it("Runs migrations in a provided schema", async () => {
  await exec(`./bin/up.js -f -c ${connectionString} -s schema_test`).catch(
    console.log
  );
  const result = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'schema_test'
      ORDER BY table_name
    `);
  expect(result.rows.map((table) => table.table_name)).toEqual([
    "executions",
    "logs",
    "migrations",
    "task_stats",
    "tasks",
  ]);
});

it("Clears the tasks queue from a provided schema", async () => {
  await pool.query("set search_path to schema_test");
  await pool.query(`
      INSERT INTO tasks ("name") VALUES ('Test Task');
      INSERT INTO executions ("task_id") VALUES (1);
    `);
  await exec(`./bin/clear.js -f -c ${connectionString} -s schema_test`).catch(
    console.log
  );
  const result = await pool.query(`SELECT t.*, e.* FROM tasks t, executions e`);
  expect(result.rowCount).toEqual(0);
});
