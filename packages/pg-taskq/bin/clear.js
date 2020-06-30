#!/usr/bin/env node
const prompts = require("prompts");
const { getClient, getSchema, getText, logConnectedDb } = require("./utils");

async function clearQ() {
  const client = getClient();
  const schema = getSchema();
  const text = getText(client, schema);

  try {
    await client.connect();
    logConnectedDb(client);
    const response = await prompts({
      type: "confirm",
      name: "ok",
      message: `\nAre you sure you want to clear all tasks from this ${text.database}?`,
    });
    if (!response.ok) return;
    await client.query(`TRUNCATE tasks CASCADE`);
    console.log(`Cleared tasks in ${text.databaseName}`);
  } finally {
    await client.end();
  }
}

clearQ().catch(console.log);
