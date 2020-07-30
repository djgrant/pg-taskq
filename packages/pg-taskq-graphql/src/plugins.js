const {
  makeChangeNullabilityPlugin,
  makePluginByCombiningPlugins
} = require("graphile-utils");
const simplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");

module.exports = makePluginByCombiningPlugins(
  simplifyInflectorPlugin,
  makeChangeNullabilityPlugin({
    Task: {
      children: false,
      descendants: false,
      childrenConnection: false,
      descendantsConnection: false
    },
    ExtendedTask: {
      id: false,
      name: false,
      executeAt: false,
      locked: false,
      status: false,
      attempts: false,
      children: false,
      descendants: false,
      childrenConnection: false,
      descendantsConnection: false
    },
    Query: {
      descendantTasks: false,
      descendantTaskCounts: false
    },
    children: {
      Task: false
    }
  })
);
