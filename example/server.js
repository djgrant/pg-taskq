const express = require("express");
const { createTaskqApp } = require("../");

const app = express();
const taskqApp = createTaskqApp({ schema: "taskq" });

app.use(taskqApp);

app.listen(3000);

console.log("Server running at http://localhost:3000");
