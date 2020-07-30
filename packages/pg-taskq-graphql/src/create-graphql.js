const path = require("path");
const { postgraphile } = require("postgraphile");
const plugins = require("./plugins");

function createPgTaskqGraphql(opts = {}) {
  return postgraphile(opts.db || {}, opts.schema, {
    appendPlugins: [plugins],
    enhanceGraphiql: true,
    graphileBuildOptions: { pgOmitListSuffix: true },
    graphiql: true,
    retryOnInitFail: true,
    dynamicJson: true,
    simpleCollections: "both",
    watchPg: process.env.NODE_ENV !== "production",
    pgSettings: () => ({
      search_path: opts.schema,
    }),
  });
}

module.exports = { createPgTaskqGraphql };
