# pg-taskq-dashboard

## Server use

```js
const express = require("express");
const {
  pgTaskqDashboard,
} = require("@djgrant/pg-taskq-dashboard/server/express");

const app = express();

app.use(pgTaskqDashboard);

app.listen(3000);
```
