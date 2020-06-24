const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { greeting: "hello there" });
});

module.exports = app;
