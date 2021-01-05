const express = require("express");
const { createPgTaskqGraphql } = require("@djgrant/pg-taskq-graphql");
const {
  pgTaskqDashboard,
} = require("@djgrant/pg-taskq-dashboard/server/express");

const app = express();
const pgTaskqGraphql = createPgTaskqGraphql({
  schema: "taskq",
});

app.use(pgTaskqGraphql);
app.use(pgTaskqDashboard);

app.listen(3001);

console.log("Dashboard running at http://localhost:3001");
