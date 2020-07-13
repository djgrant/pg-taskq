const path = require("path");
const express = require("express");
const pg = require("pg");
const queries = require("./queries");

const app = express();

function createPgTaskqApp(opts = {}) {
  const pool = new pg.Pool(opts.db);
  if (opts.schema) {
    pool.on("connect", (client) =>
      client.query(`SET search_path TO ${opts.schema}`)
    );
  }

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "./views"));

  app.use(express.static(path.join(__dirname, "./public")));

  app.use((req, res, next) => {
    app.locals.path = (urlPath) => path.join(app.mountpath, urlPath);
    next();
  });

  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

  app.disable("view cache");

  app.get(["/", "/tasks", "/tasks/:id/tasks"], async (req, res) => {
    const { id } = req.params;

    try {
      const { rows: tasks } = await pool.query(
        id ? queries.selectChildTasks({ id }) : queries.selectRootTasks()
      );

      if (!id && !tasks.length) {
        res.render("pages/index");
        return;
      }

      if (!tasks.length) {
        res.sendStatus(404);
        return;
      }

      const {
        rows: [parent],
      } = await pool.query(queries.selectTask({ id: tasks[0].parent_id }));

      res.render("pages/index", { tasks, parent });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/tasks/:taskId", async (req, res) => {
    const { taskId } = req.params;

    try {
      const {
        rows: [execution],
      } = await pool.query(queries.selectLatestExecution({ taskId }));

      if (!execution) {
        res.sendStatus(404);
        return;
      }

      const { rows: logs } = await pool.query(
        queries.selectLogs({ executionId: execution.id })
      );

      res.render("pages/execution", { execution, logs });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/tasks/:taskId/executions/:executionId/", async (req, res) => {
    const { executionId } = req.params;

    try {
      const {
        rows: [execution],
      } = await pool.query(queries.selectExecution({ executionId }));

      if (!execution) {
        res.sendStatus(404);
        return;
      }

      const { rows: logs } = await pool.query(
        queries.selectLogs({ executionId })
      );

      res.render("pages/execution", { execution, logs });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.post("/api/tasks/:taskId/execution", async (req, res) => {
    const taskId = req.params.taskId;

    try {
      const {
        rows: [task],
      } = await pool.query(queries.rerunTask({ taskId }));

      if (!task) {
        res.sendStatus(404);
        return;
      }

      res.json(task);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get((req, res) => res.status(204));

  return app;
}

module.exports = { createPgTaskqApp };
