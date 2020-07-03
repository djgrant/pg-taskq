#!/usr/bin/env node
const prompts = require("prompts");
const { args, client, text, logConnectedDb } = require("./utils");

async function clearQ() {
  try {
    await client.connect();
    logConnectedDb(client);
    if (!args.force) {
      const response = await prompts({
        type: "confirm",
        name: "ok",
        message: `\nAre you sure you want to clear all tasks from this ${text.database}?`,
      });
      if (!response.ok) return;
    }
    await client.query(`TRUNCATE tasks CASCADE`);
    console.log(`Cleared tasks in ${text.databaseName}`);
  } finally {
    await client.end();
  }
}

clearQ().catch((err) => {
  console.log(err);
  process.exit(1);
});
