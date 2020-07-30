import { postgraphile } from "postgraphile";
import plugins from "./plugins";
import { formatLogMessage } from "./format-log";

export function createPgTaskqGraphql(opts: { db?: any; schema?: string } = {}) {
  return postgraphile(opts.db || {}, opts.schema, {
    appendPlugins: [plugins],
    enhanceGraphiql: true,
    graphiql: true,
    retryOnInitFail: true,
    dynamicJson: true,
    simpleCollections: "both",
    watchPg: process.env.NODE_ENV !== "production",
    pgSettings: () => ({
      search_path: opts.schema
    }),
    graphileBuildOptions: {
      pgOmitListSuffix: true,
      derivedFieldDefinitions: [
        {
          identifiers: [
            {
              table: opts.schema ? `${opts.schema}.logs` : "logs",
              columns: ["message"]
            }
          ],
          inflect: () => "messageParsed",
          resolve: (val: string) => formatLogMessage(val)
        }
      ]
    }
  });
}
