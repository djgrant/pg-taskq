const path = require("path");
const express = require("express");

const pgTaskqDashboard = express.static(path.join(__dirname, "../build"));

module.exports = { pgTaskqDashboard };
