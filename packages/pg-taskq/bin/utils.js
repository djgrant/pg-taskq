const pg = require("pg");
const { argv } = require("yargs");

const ensureString = (str) => (typeof str === "string" ? str : undefined);

const args = {
  connectionString: ensureString(argv.c || argv.connection),
  schema: ensureString(argv.s || argv.schema),
  force: Boolean(argv.f || argv.force),
};

const clientOptions = args.connectionString && {
  connectionString: args.connectionString,
};

const client = new pg.Client(clientOptions);

if (args.schema) {
  client.on("connect", () => client.query(`SET search_path TO ${args.schema}`));
}

const logConnectedDb = (client) => {
  const db = {
    database: client.database,
    schema: args.schema,
    user: client.user,
    host: client.host,
    port: client.port,
  };
  console.log("\nConnected to:", db);
};

const text = {
  database: `database${args.schema ? " schema" : ""}`,
  databaseName: `${client.database}${args.schema ? `.${args.schema}` : ""}`,
};

module.exports = {
  args,
  client,
  text,
  logConnectedDb,
};
