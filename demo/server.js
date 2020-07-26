const express = require("express");
const { createPgTaskqApp } = require("pg-taskq-server");

const app = express();
const taskqApp = createPgTaskqApp({ schema: "taskq" });

app.use(taskqApp);

app.listen(3002);

console.log("Server running at http://localhost:3002");
