const pg = require("pg");
const { argv } = require("yargs");

const connectionString = argv.c || argv.connection;
const schema = argv.s || argv.schema;

const getSchema = () => (typeof schema === "string" ? schema : undefined);

const getClient = () => {
  const clientOptions = connectionString && { connectionString };
  const client = new pg.Client(clientOptions);
  if (schema) {
    client.on("connect", () => client.query(`SET search_path TO ${schema}`));
  }
  return client;
};

const logConnectedDb = (client) => {
  const db = {
    database: client.database,
    schema: getSchema(),
    user: client.user,
    host: client.host,
    port: client.port,
  };
  console.log("\nConnected to:", db);
};

const getText = (client, schema) => {
  return {
    database: `database${schema ? " schema" : ""}`,
    databaseName: `${client.database}${schema ? `.${schema}` : ""}`,
  };
};

module.exports = {
  getClient,
  getSchema,
  getText,
  logConnectedDb,
};
