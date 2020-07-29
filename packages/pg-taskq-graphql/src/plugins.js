const {
  makeChangeNullabilityPlugin,
  makePluginByCombiningPlugins
} = require("graphile-utils");

module.exports = makePluginByCombiningPlugins(
  makeChangeNullabilityPlugin({
    ExtendedTask: {
      id: false,
      name: false,
      executeAt: false,
      locked: false,
      status: false,
      attempts: false
    }
  })
);
