const express = require("express");
const { createPgTaskqApp } = require("../");

const app = express();
const taskqApp = createPgTaskqApp({ schema: "taskq" });

app.use(taskqApp);

app.listen(3000);

console.log("Server running at http://localhost:3000");
