const { postgraphile } = require("postgraphile");
const simplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");

function createPgTaskqGraphql(opts = {}) {
  return postgraphile(opts.db || {}, opts.schema, {
    appendPlugins: [simplifyInflectorPlugin],
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
