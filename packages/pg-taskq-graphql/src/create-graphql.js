const path = require("path");
const { postgraphile } = require("postgraphile");
const plugins = require("./plugins");
const { formatLogMessage } = require("./format-log");

function createPgTaskqGraphql(opts = {}) {
  return postgraphile(opts.db || {}, opts.schema, {
    appendPlugins: [plugins],
    enhanceGraphiql: true,
    graphiql: true,
    retryOnInitFail: true,
    dynamicJson: true,
    simpleCollections: "both",
    watchPg: process.env.NODE_ENV !== "production",
    pgSettings: () => ({
      search_path: opts.schema,
    }),
    graphileBuildOptions: {
      pgOmitListSuffix: true,
      derivedFieldDefinitions: [
        {
          identifiers: [
            {
              table: opts.schema ? `${opts.schema}.logs` : "logs",
              columns: ["message"],
            },
          ],
          inflect: () => "messageParsed",
          resolve: (val) => formatLogMessage(val),
        },
      ],
    },
  });
}

module.exports = { createPgTaskqGraphql };
