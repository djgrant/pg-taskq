const path = require("path");
const express = require("express");
const pg = require("pg");
const queries = require("./queries");

const app = express();

function createTaskqApp(opts = {}) {
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
    app.locals.mountpath = app.mountpath;
    next();
  });

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

      const { rows: parents } = await pool.query(
        queries.selectTask({ id: tasks[0].parent_id })
      );

      res.render("pages/index", { tasks, parent: parents[0] });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/tasks/:taskId", async (req, res) => {
    const { taskId } = req.params;

    try {
      const { rows: executions } = await pool.query(
        queries.selectLatestExecution({ taskId })
      );

      if (!executions.length) {
        res.sendStatus(404);
        return;
      }

      res.render("pages/execution", { execution: executions[0] });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/executions/:executionId/", async (req, res) => {
    const { executionId } = req.params;

    try {
      const { rows: executions } = await pool.query(
        queries.selectExecution({ executionId })
      );

      if (!executions.length) {
        res.sendStatus(404);
        return;
      }

      res.render("pages/execution", { execution: executions[0] });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/api/tasks/:taskId/rerun", async (req, res) => {
    const taskId = req.params.taskId;

    try {
      const { rows: tasks } = await pool.query(queries.rerunTask({ taskId }));
      if (!tasks.length) {
        res.sendStatus(404);
        return;
      }
      res.json(tasks[0]);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get((req, res) => res.status(204));

  return app;
}

module.exports = { createTaskqApp };
