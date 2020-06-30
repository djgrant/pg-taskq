const pg = require("pg");
const { argv } = require("yargs");

const connectionString = argv.c || argv.connection;
const schema = argv.s || argv.schema;

const getClient = () => {
  const clientOptions = connectionString && { connectionString };
  const client = new pg.Client(clientOptions);
  if (schema) {
    client.on("connect", () => client.query(`SET search_path TO ${schema}`));
  }
  return client;
};

const getSchema = () => schema;

module.exports = { getClient, getSchema };
