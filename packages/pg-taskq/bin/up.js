#!/usr/bin/env node
const path = require("path");
const prompts = require("prompts");
const { migrate } = require("@djgrant/postgres-migrations");
const { getClient, getSchema, getText, logConnectedDb } = require("./utils");

async function runMigrations() {
  const client = getClient();
  const schema = getSchema();
  const text = getText(client, schema);

  try {
    await client.connect();
    logConnectedDb(client);
    const response = await prompts({
      type: "confirm",
      name: "ok",
      message: `\nWould you like to set up taskq in this ${text.database}?`,
    });
    if (!response.ok) return;
    if (schema) {
      console.log(`Creating schema "${schema}"`);
      await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
    }
    await migrate({ client }, path.resolve(__dirname, "../db"), {
      migrationTableName: "migrations",
      logger: console.log,
    });
  } finally {
    await client.end();
  }
}

runMigrations().catch(console.log);
