#!/usr/bin/env node
const path = require("path");
const pg = require("pg");
const { migrate } = require("@djgrant/postgres-migrations");
const { argv } = require("yargs");

async function runMigrations() {
  const connectionString = argv.c || argv.connection;
  const clientOptions = connectionString && { connectionString };
  const client = new pg.Client(clientOptions);
  await client.connect();
  try {
    console.log("Creating schema 'taskq'...");
    await client.query("CREATE SCHEMA IF NOT EXISTS taskq");
    console.log(`Created schema "taskq" in database "${client.database}"`);
    console.log("Applying taskq migrations...");
    await migrate({ client }, path.resolve(__dirname, "../db"), {
      migrationTableName: "taskq.migrations",
      logger: console.log,
    });
  } finally {
    await client.end();
  }
}

runMigrations().catch(console.log);
