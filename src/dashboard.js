const path = require("path");
const express = require("express");
const pg = require("pg");
const sql = require("sql-template-strings");

const app = express();

function createApp(opts = {}) {
  const pool = new pg.Pool(opts.db);
  if (opts.schema) {
    pool.on("connect", (client) =>
      client.query(`SET search_path TO ${opts.schema}`)
    );
  }

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));

  app.get("/favicon.ico", (req, res) => res.status(204));

  app.use(express.static(path.join(__dirname, "../public")));

  app.use((req, res, next) => {
    app.locals.mountpath = app.mountpath.endsWith("/")
      ? app.mountpath
      : app.mountpath + "/";
    next();
  });

  app.get("/:id?", async (req, res) => {
    const id = req.params.id;
    const rootQuery = sql`
        SELECT t.*, (
          SELECT count(*)::int
          FROM tasks tt
          WHERE t.id = tt.parent_id
        ) AS children 
        FROM tasks_extended t 
        WHERE parent_id IS NULL
      `;

    const nestedQuery = sql`
        SELECT t.*, (
          SELECT count(*)::int
          FROM tasks tt
          WHERE t.id = tt.parent_id
        ) AS children 
        FROM tasks_extended t 
        WHERE parent_id = ${id}
      `;

    try {
      const { rows: tasks } = await pool.query(id ? nestedQuery : rootQuery);

      if (!tasks.length) {
        res.render("pages/index", { tasks: [] });
        return;
      }

      const { rows: parents } = await pool.query(
        sql`SELECT * FROM tasks WHERE id = ${tasks[0].parent_id}`
      );
      res.render("pages/index", { tasks, parent: parents[0] });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/:id/execution", async (req, res) => {
    const id = req.params.id;
    const executionQuery = sql`
      SELECT *, t.*, (
        SELECT count(*)::int
        FROM tasks tt
        WHERE t.id = tt.parent_id
      ) AS children 
      FROM executions, tasks_extended t 
      WHERE task_id = ${id} 
      AND t.id = task_id 
      ORDER BY started_at DESC 
      LIMIT 1
    `;

    try {
      const { rows: executions } = await pool.query(executionQuery);

      if (!executions.length) {
        res.sendStatus(404);
        return;
      }

      res.render("pages/execution", { execution: executions[0] });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  });

  return app;
}

module.exports = createApp;
