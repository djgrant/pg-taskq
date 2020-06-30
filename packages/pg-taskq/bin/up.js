#!/usr/bin/env node
const path = require("path");
const { migrate } = require("@djgrant/postgres-migrations");
const { getClient, getSchema } = require("./utils");

async function runMigrations() {
  const client = getClient();
  const schema = getSchema();
  await client.connect();
  try {
    if (schema) {
      console.log(`Creating schema "${schema}"`);
      await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
    }
    await migrate({ client }, path.resolve(__dirname, "../db"), {
      migrationTableName: "_migrations",
      logger: console.log,
    });
  } finally {
    await client.end();
  }
}

runMigrations().catch(console.log);
