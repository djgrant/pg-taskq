const path = require("path");
const express = require("express");

const static = express.static(path.join(__dirname, "../build"));
const pgTaskqDashboard = express();

pgTaskqDashboard.use(static);
pgTaskqDashboard.use("/*", static);

module.exports = { pgTaskqDashboard };
