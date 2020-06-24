const express = require("express");
const { dashboard } = require("../");

const app = express();

app.use(dashboard);

app.listen(3000);

console.log("Server running at http://localhost:3000");
