#!/usr/bin/env node
const { getClient, getSchema } = require("./utils");

async function clearQ() {
  const client = getClient();
  const schema = getSchema();
  try {
    await client.connect();
    await client.query(`TRUNCATE tasks CASCADE`);
    console.log(`Cleared tasks in "${[client.database, schema].join(".")}"`);
  } finally {
    await client.end();
  }
}

clearQ().catch(console.log);
