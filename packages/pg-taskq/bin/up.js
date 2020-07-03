#!/usr/bin/env node
const path = require("path");
const prompts = require("prompts");
const { migrate } = require("@djgrant/postgres-migrations");
const { args, text, client, logConnectedDb } = require("./utils");

async function runMigrations() {
  try {
    await client.connect();
    logConnectedDb(client);
    if (!args.force) {
      const response = await prompts({
        type: "confirm",
        name: "ok",
        message: `\nWould you like to set up taskq in this ${text.database}?`,
      });
      if (!response.ok) return;
    }
    if (args.schema) {
      console.log(`Creating schema "${args.schema} if one doesn't exist"`);
      await client.query(`CREATE SCHEMA IF NOT EXISTS ${args.schema}`);
    }
    await migrate({ client }, path.resolve(__dirname, "../db"), {
      migrationTableName: "migrations",
      logger: console.log,
    });
  } finally {
    await client.end();
  }
}

runMigrations().catch((err) => {
  console.log(err);
  process.exit(1);
});
