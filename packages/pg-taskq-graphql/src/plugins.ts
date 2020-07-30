import {
  makeChangeNullabilityPlugin,
  makePluginByCombiningPlugins
} from "graphile-utils";
import simplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import PostGraphileDerivedFieldPlugin from "postgraphile-plugin-derived-field";

export default makePluginByCombiningPlugins(
  simplifyInflectorPlugin,
  PostGraphileDerivedFieldPlugin,
  makeChangeNullabilityPlugin({
    Task: {
      children: false,
      descendants: false,
      childrenConnection: false,
      descendantsConnection: false,
      childrenCounts: false,
      descendantsCounts: false
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
      descendantTaskCounts: false,
      childrenTasks: false,
      childrenTaskCounts: false
    },
    children: {
      Task: false
    }
  })
);
