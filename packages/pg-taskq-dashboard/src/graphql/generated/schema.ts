// @ts-nocheck
import * as extensions from "../extensions";
import { lazyGetters } from "@gqless/utils";
import {
  ObjectNode,
  FieldNode,
  ArrayNode,
  Arguments,
  ArgumentsField,
  InterfaceNode,
  ScalarNode,
  EnumNode,
  InputNode,
  InputNodeField,
} from "gqless";

export const schema = {
  get Query() {
    return new ObjectNode(
      {
        get query() {
          return new FieldNode(schema.Query, undefined, false);
        },
        get nodeId() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get node() {
          return new FieldNode(
            schema.Node,
            new Arguments(
              {
                get nodeId() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true
            ),
            true
          );
        },
        get executionsConnection() {
          return new FieldNode(
            schema.ExecutionsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.ExecutionCondition, true);
              },
            }),
            true
          );
        },
        get executions() {
          return new FieldNode(
            new ArrayNode(schema.Execution, true),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.ExecutionCondition, true);
              },
            }),
            true
          );
        },
        get logsConnection() {
          return new FieldNode(
            schema.LogsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.LogCondition, true);
              },
            }),
            true
          );
        },
        get logs() {
          return new FieldNode(
            new ArrayNode(schema.Log, true),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.LogCondition, true);
              },
            }),
            true
          );
        },
        get migrationsConnection() {
          return new FieldNode(
            schema.MigrationsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.MigrationsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.MigrationCondition, true);
              },
            }),
            true
          );
        },
        get migrations() {
          return new FieldNode(
            new ArrayNode(schema.Migration, true),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.MigrationsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.MigrationCondition, true);
              },
            }),
            true
          );
        },
        get taskStatsConnection() {
          return new FieldNode(
            schema.TaskStatsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskStatCondition, true);
              },
            }),
            true
          );
        },
        get taskStats() {
          return new FieldNode(
            new ArrayNode(schema.TaskStat, true),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskStatCondition, true);
              },
            }),
            true
          );
        },
        get tasksConnection() {
          return new FieldNode(
            schema.TasksConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            true
          );
        },
        get tasks() {
          return new FieldNode(
            new ArrayNode(schema.Task, true),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            true
          );
        },
        get execution() {
          return new FieldNode(
            schema.Execution,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.BigInt, false);
                },
              },
              true
            ),
            true
          );
        },
        get log() {
          return new FieldNode(
            schema.Log,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.BigInt, false);
                },
              },
              true
            ),
            true
          );
        },
        get migration() {
          return new FieldNode(
            schema.Migration,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get migrationByName() {
          return new FieldNode(
            schema.Migration,
            new Arguments(
              {
                get name() {
                  return new ArgumentsField(schema.String, false);
                },
              },
              true
            ),
            true
          );
        },
        get taskStatByTaskIdAndCollection() {
          return new FieldNode(
            schema.TaskStat,
            new Arguments(
              {
                get taskId() {
                  return new ArgumentsField(schema.BigInt, false);
                },
                get collection() {
                  return new ArgumentsField(schema.String, false);
                },
              },
              true
            ),
            true
          );
        },
        get task() {
          return new FieldNode(
            schema.Task,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.BigInt, false);
                },
              },
              true
            ),
            true
          );
        },
        get taskByNameAndParamsAndContextAndExecuteAt() {
          return new FieldNode(
            schema.Task,
            new Arguments(
              {
                get name() {
                  return new ArgumentsField(schema.String, false);
                },
                get params() {
                  return new ArgumentsField(schema.JSON, false);
                },
                get context() {
                  return new ArgumentsField(schema.JSON, false);
                },
                get executeAt() {
                  return new ArgumentsField(schema.Datetime, false);
                },
              },
              true
            ),
            true
          );
        },
        get childTasksConnection() {
          return new FieldNode(
            schema.TasksConnection,
            new Arguments({
              get taskId() {
                return new ArgumentsField(schema.BigInt, true);
              },
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            false
          );
        },
        get childTasks() {
          return new FieldNode(
            new ArrayNode(schema.Task, true),
            new Arguments({
              get taskId() {
                return new ArgumentsField(schema.BigInt, true);
              },
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            true
          );
        },
        get descendantTasksConnection() {
          return new FieldNode(
            schema.TasksConnection,
            new Arguments({
              get taskId() {
                return new ArgumentsField(schema.BigInt, true);
              },
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            false
          );
        },
        get descendantTasks() {
          return new FieldNode(
            new ArrayNode(schema.Task, false),
            new Arguments({
              get taskId() {
                return new ArgumentsField(schema.BigInt, true);
              },
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            false
          );
        },
        get rootChildrenStats() {
          return new FieldNode(schema.JSON, undefined, true);
        },
        get rootDescendantsStats() {
          return new FieldNode(schema.JSON, undefined, true);
        },
        get executionByNodeId() {
          return new FieldNode(
            schema.Execution,
            new Arguments(
              {
                get nodeId() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true
            ),
            true
          );
        },
        get logByNodeId() {
          return new FieldNode(
            schema.Log,
            new Arguments(
              {
                get nodeId() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true
            ),
            true
          );
        },
        get migrationByNodeId() {
          return new FieldNode(
            schema.Migration,
            new Arguments(
              {
                get nodeId() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true
            ),
            true
          );
        },
        get taskByNodeId() {
          return new FieldNode(
            schema.Task,
            new Arguments(
              {
                get nodeId() {
                  return new ArgumentsField(schema.ID, false);
                },
              },
              true
            ),
            true
          );
        },
      },
      { name: "Query", extension: ((extensions as any) || {}).Query }
    );
  },
  get Node() {
    return new InterfaceNode(
      {
        get nodeId() {
          return new FieldNode(schema.ID, undefined, false);
        },
      },
      [
        schema.Query,
        schema.Execution,
        schema.Task,
        schema.Log,
        schema.Migration,
      ],
      { name: "Node", extension: ((extensions as any) || {}).Node }
    );
  },
  get ID() {
    return new ScalarNode({
      name: "ID",
      extension: ((extensions as any) || {}).ID,
    });
  },
  get Int() {
    return new ScalarNode({
      name: "Int",
      extension: ((extensions as any) || {}).Int,
    });
  },
  get Cursor() {
    return new ScalarNode({
      name: "Cursor",
      extension: ((extensions as any) || {}).Cursor,
    });
  },
  get ExecutionsOrderBy() {
    return new EnumNode({ name: "ExecutionsOrderBy" });
  },
  get ExecutionCondition() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get status() {
          return new InputNodeField(schema.String, true);
        },
        get startedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
        get finishedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
      },
      { name: "ExecutionCondition" }
    );
  },
  get BigInt() {
    return new ScalarNode({
      name: "BigInt",
      extension: ((extensions as any) || {}).BigInt,
    });
  },
  get String() {
    return new ScalarNode({
      name: "String",
      extension: ((extensions as any) || {}).String,
    });
  },
  get Datetime() {
    return new ScalarNode({
      name: "Datetime",
      extension: ((extensions as any) || {}).Datetime,
    });
  },
  get ExecutionsConnection() {
    return new ObjectNode(
      {
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.Execution, false),
            undefined,
            false
          );
        },
        get edges() {
          return new FieldNode(
            new ArrayNode(schema.ExecutionsEdge, false),
            undefined,
            false
          );
        },
        get pageInfo() {
          return new FieldNode(schema.PageInfo, undefined, false);
        },
        get totalCount() {
          return new FieldNode(schema.Int, undefined, false);
        },
      },
      {
        name: "ExecutionsConnection",
        extension: ((extensions as any) || {}).ExecutionsConnection,
      }
    );
  },
  get Execution() {
    return new ObjectNode(
      {
        get nodeId() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get id() {
          return new FieldNode(schema.BigInt, undefined, false);
        },
        get taskId() {
          return new FieldNode(schema.BigInt, undefined, false);
        },
        get status() {
          return new FieldNode(schema.String, undefined, false);
        },
        get startedAt() {
          return new FieldNode(schema.Datetime, undefined, false);
        },
        get finishedAt() {
          return new FieldNode(schema.Datetime, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get logsConnection() {
          return new FieldNode(
            schema.LogsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.LogCondition, true);
              },
            }),
            false
          );
        },
        get logs() {
          return new FieldNode(
            new ArrayNode(schema.Log, false),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.LogCondition, true);
              },
            }),
            false
          );
        },
        get duration() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      { name: "Execution", extension: ((extensions as any) || {}).Execution }
    );
  },
  get Task() {
    return new ObjectNode(
      {
        get nodeId() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get id() {
          return new FieldNode(schema.BigInt, undefined, false);
        },
        get parentId() {
          return new FieldNode(schema.BigInt, undefined, true);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get params() {
          return new FieldNode(schema.JSON, undefined, false);
        },
        get context() {
          return new FieldNode(schema.JSON, undefined, false);
        },
        get executeAt() {
          return new FieldNode(schema.Datetime, undefined, false);
        },
        get priority() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get locked() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get status() {
          return new FieldNode(schema.String, undefined, false);
        },
        get attempts() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get parent() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get childTasksConnection() {
          return new FieldNode(
            schema.TasksConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            false
          );
        },
        get childTasks() {
          return new FieldNode(
            new ArrayNode(schema.Task, false),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskCondition, true);
              },
            }),
            false
          );
        },
        get taskStatsConnection() {
          return new FieldNode(
            schema.TaskStatsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskStatCondition, true);
              },
            }),
            false
          );
        },
        get taskStats() {
          return new FieldNode(
            new ArrayNode(schema.TaskStat, false),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.TaskStatCondition, true);
              },
            }),
            false
          );
        },
        get executionsConnection() {
          return new FieldNode(
            schema.ExecutionsConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.ExecutionCondition, true);
              },
            }),
            false
          );
        },
        get executions() {
          return new FieldNode(
            new ArrayNode(schema.Execution, false),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
              get condition() {
                return new ArgumentsField(schema.ExecutionCondition, true);
              },
            }),
            false
          );
        },
        get childrenStats() {
          return new FieldNode(schema.JSON, undefined, true);
        },
        get complete() {
          return new FieldNode(schema.Boolean, undefined, true);
        },
        get descendantTasksConnection() {
          return new FieldNode(
            schema.TasksConnection,
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get last() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get before() {
                return new ArgumentsField(schema.Cursor, true);
              },
              get after() {
                return new ArgumentsField(schema.Cursor, true);
              },
            }),
            false
          );
        },
        get descendantTasks() {
          return new FieldNode(
            new ArrayNode(schema.Task, true),
            new Arguments({
              get first() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
            }),
            true
          );
        },
        get descendantsStats() {
          return new FieldNode(schema.JSON, undefined, true);
        },
        get lastExecuted() {
          return new FieldNode(schema.Datetime, undefined, true);
        },
        get latestExecution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
      },
      { name: "Task", extension: ((extensions as any) || {}).Task }
    );
  },
  get JSON() {
    return new ScalarNode({
      name: "JSON",
      extension: ((extensions as any) || {}).JSON,
    });
  },
  get Boolean() {
    return new ScalarNode({
      name: "Boolean",
      extension: ((extensions as any) || {}).Boolean,
    });
  },
  get TasksOrderBy() {
    return new EnumNode({ name: "TasksOrderBy" });
  },
  get TaskCondition() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get parentId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get params() {
          return new InputNodeField(schema.JSON, true);
        },
        get context() {
          return new InputNodeField(schema.JSON, true);
        },
        get executeAt() {
          return new InputNodeField(schema.Datetime, true);
        },
        get priority() {
          return new InputNodeField(schema.Int, true);
        },
        get locked() {
          return new InputNodeField(schema.Boolean, true);
        },
        get status() {
          return new InputNodeField(schema.String, true);
        },
        get attempts() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "TaskCondition" }
    );
  },
  get TasksConnection() {
    return new ObjectNode(
      {
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.Task, false),
            undefined,
            false
          );
        },
        get edges() {
          return new FieldNode(
            new ArrayNode(schema.TasksEdge, false),
            undefined,
            false
          );
        },
        get pageInfo() {
          return new FieldNode(schema.PageInfo, undefined, false);
        },
        get totalCount() {
          return new FieldNode(schema.Int, undefined, false);
        },
      },
      {
        name: "TasksConnection",
        extension: ((extensions as any) || {}).TasksConnection,
      }
    );
  },
  get TasksEdge() {
    return new ObjectNode(
      {
        get cursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
        get node() {
          return new FieldNode(schema.Task, undefined, true);
        },
      },
      { name: "TasksEdge", extension: ((extensions as any) || {}).TasksEdge }
    );
  },
  get PageInfo() {
    return new ObjectNode(
      {
        get hasNextPage() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get hasPreviousPage() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get startCursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
        get endCursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
      },
      { name: "PageInfo", extension: ((extensions as any) || {}).PageInfo }
    );
  },
  get TaskStatsOrderBy() {
    return new EnumNode({ name: "TaskStatsOrderBy" });
  },
  get TaskStatCondition() {
    return new InputNode(
      {
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get collection() {
          return new InputNodeField(schema.String, true);
        },
        get scheduled() {
          return new InputNodeField(schema.Int, true);
        },
        get pending() {
          return new InputNodeField(schema.Int, true);
        },
        get running() {
          return new InputNodeField(schema.Int, true);
        },
        get failure() {
          return new InputNodeField(schema.Int, true);
        },
        get timeout() {
          return new InputNodeField(schema.Int, true);
        },
        get success() {
          return new InputNodeField(schema.Int, true);
        },
        get locked() {
          return new InputNodeField(schema.Int, true);
        },
        get total() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "TaskStatCondition" }
    );
  },
  get TaskStatsConnection() {
    return new ObjectNode(
      {
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.TaskStat, false),
            undefined,
            false
          );
        },
        get edges() {
          return new FieldNode(
            new ArrayNode(schema.TaskStatsEdge, false),
            undefined,
            false
          );
        },
        get pageInfo() {
          return new FieldNode(schema.PageInfo, undefined, false);
        },
        get totalCount() {
          return new FieldNode(schema.Int, undefined, false);
        },
      },
      {
        name: "TaskStatsConnection",
        extension: ((extensions as any) || {}).TaskStatsConnection,
      }
    );
  },
  get TaskStat() {
    return new ObjectNode(
      {
        get taskId() {
          return new FieldNode(schema.BigInt, undefined, true);
        },
        get collection() {
          return new FieldNode(schema.String, undefined, false);
        },
        get scheduled() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get pending() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get running() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get failure() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get timeout() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get success() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get locked() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get total() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
      },
      { name: "TaskStat", extension: ((extensions as any) || {}).TaskStat }
    );
  },
  get TaskStatsEdge() {
    return new ObjectNode(
      {
        get cursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
        get node() {
          return new FieldNode(schema.TaskStat, undefined, true);
        },
      },
      {
        name: "TaskStatsEdge",
        extension: ((extensions as any) || {}).TaskStatsEdge,
      }
    );
  },
  get LogsOrderBy() {
    return new EnumNode({ name: "LogsOrderBy" });
  },
  get LogCondition() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get executionId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get time() {
          return new InputNodeField(schema.Datetime, true);
        },
        get message() {
          return new InputNodeField(schema.JSON, true);
        },
      },
      { name: "LogCondition" }
    );
  },
  get LogsConnection() {
    return new ObjectNode(
      {
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.Log, false),
            undefined,
            false
          );
        },
        get edges() {
          return new FieldNode(
            new ArrayNode(schema.LogsEdge, false),
            undefined,
            false
          );
        },
        get pageInfo() {
          return new FieldNode(schema.PageInfo, undefined, false);
        },
        get totalCount() {
          return new FieldNode(schema.Int, undefined, false);
        },
      },
      {
        name: "LogsConnection",
        extension: ((extensions as any) || {}).LogsConnection,
      }
    );
  },
  get Log() {
    return new ObjectNode(
      {
        get nodeId() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get id() {
          return new FieldNode(schema.BigInt, undefined, false);
        },
        get executionId() {
          return new FieldNode(schema.BigInt, undefined, false);
        },
        get time() {
          return new FieldNode(schema.Datetime, undefined, false);
        },
        get message() {
          return new FieldNode(schema.JSON, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get messageParsed() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      { name: "Log", extension: ((extensions as any) || {}).Log }
    );
  },
  get LogsEdge() {
    return new ObjectNode(
      {
        get cursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
        get node() {
          return new FieldNode(schema.Log, undefined, true);
        },
      },
      { name: "LogsEdge", extension: ((extensions as any) || {}).LogsEdge }
    );
  },
  get ExecutionsEdge() {
    return new ObjectNode(
      {
        get cursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
        get node() {
          return new FieldNode(schema.Execution, undefined, true);
        },
      },
      {
        name: "ExecutionsEdge",
        extension: ((extensions as any) || {}).ExecutionsEdge,
      }
    );
  },
  get MigrationsOrderBy() {
    return new EnumNode({ name: "MigrationsOrderBy" });
  },
  get MigrationCondition() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, true);
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get hash() {
          return new InputNodeField(schema.String, true);
        },
        get executedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
      },
      { name: "MigrationCondition" }
    );
  },
  get MigrationsConnection() {
    return new ObjectNode(
      {
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.Migration, false),
            undefined,
            false
          );
        },
        get edges() {
          return new FieldNode(
            new ArrayNode(schema.MigrationsEdge, false),
            undefined,
            false
          );
        },
        get pageInfo() {
          return new FieldNode(schema.PageInfo, undefined, false);
        },
        get totalCount() {
          return new FieldNode(schema.Int, undefined, false);
        },
      },
      {
        name: "MigrationsConnection",
        extension: ((extensions as any) || {}).MigrationsConnection,
      }
    );
  },
  get Migration() {
    return new ObjectNode(
      {
        get nodeId() {
          return new FieldNode(schema.ID, undefined, false);
        },
        get id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get hash() {
          return new FieldNode(schema.String, undefined, false);
        },
        get executedAt() {
          return new FieldNode(schema.Datetime, undefined, true);
        },
      },
      { name: "Migration", extension: ((extensions as any) || {}).Migration }
    );
  },
  get MigrationsEdge() {
    return new ObjectNode(
      {
        get cursor() {
          return new FieldNode(schema.Cursor, undefined, true);
        },
        get node() {
          return new FieldNode(schema.Migration, undefined, true);
        },
      },
      {
        name: "MigrationsEdge",
        extension: ((extensions as any) || {}).MigrationsEdge,
      }
    );
  },
  get Mutation() {
    return new ObjectNode(
      {
        get createExecution() {
          return new FieldNode(
            schema.CreateExecutionPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.CreateExecutionInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get createLog() {
          return new FieldNode(
            schema.CreateLogPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.CreateLogInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get createMigration() {
          return new FieldNode(
            schema.CreateMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.CreateMigrationInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get createTaskStat() {
          return new FieldNode(
            schema.CreateTaskStatPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.CreateTaskStatInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get createTask() {
          return new FieldNode(
            schema.CreateTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.CreateTaskInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get updateExecutionByNodeId() {
          return new FieldNode(
            schema.UpdateExecutionPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateExecutionByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateExecution() {
          return new FieldNode(
            schema.UpdateExecutionPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.UpdateExecutionInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get updateLogByNodeId() {
          return new FieldNode(
            schema.UpdateLogPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateLogByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateLog() {
          return new FieldNode(
            schema.UpdateLogPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.UpdateLogInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get updateMigrationByNodeId() {
          return new FieldNode(
            schema.UpdateMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateMigrationByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateMigration() {
          return new FieldNode(
            schema.UpdateMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.UpdateMigrationInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get updateMigrationByName() {
          return new FieldNode(
            schema.UpdateMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateMigrationByNameInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateTaskStatByTaskIdAndCollection() {
          return new FieldNode(
            schema.UpdateTaskStatPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateTaskStatByTaskIdAndCollectionInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateTaskByNodeId() {
          return new FieldNode(
            schema.UpdateTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateTaskByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateTask() {
          return new FieldNode(
            schema.UpdateTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.UpdateTaskInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get updateTaskByNameAndParamsAndContextAndExecuteAt() {
          return new FieldNode(
            schema.UpdateTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateTaskByNameAndParamsAndContextAndExecuteAtInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteExecutionByNodeId() {
          return new FieldNode(
            schema.DeleteExecutionPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteExecutionByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteExecution() {
          return new FieldNode(
            schema.DeleteExecutionPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.DeleteExecutionInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get deleteLogByNodeId() {
          return new FieldNode(
            schema.DeleteLogPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteLogByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteLog() {
          return new FieldNode(
            schema.DeleteLogPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.DeleteLogInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get deleteMigrationByNodeId() {
          return new FieldNode(
            schema.DeleteMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteMigrationByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteMigration() {
          return new FieldNode(
            schema.DeleteMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.DeleteMigrationInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get deleteMigrationByName() {
          return new FieldNode(
            schema.DeleteMigrationPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteMigrationByNameInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteTaskStatByTaskIdAndCollection() {
          return new FieldNode(
            schema.DeleteTaskStatPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteTaskStatByTaskIdAndCollectionInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteTaskByNodeId() {
          return new FieldNode(
            schema.DeleteTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteTaskByNodeIdInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get deleteTask() {
          return new FieldNode(
            schema.DeleteTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.DeleteTaskInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get deleteTaskByNameAndParamsAndContextAndExecuteAt() {
          return new FieldNode(
            schema.DeleteTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.DeleteTaskByNameAndParamsAndContextAndExecuteAtInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get executeTask() {
          return new FieldNode(
            schema.ExecuteTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.ExecuteTaskInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get incTaskStat() {
          return new FieldNode(
            schema.IncTaskStatPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.IncTaskStatInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get processNextTask() {
          return new FieldNode(
            schema.ProcessNextTaskPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.ProcessNextTaskInput, false);
                },
              },
              true
            ),
            true
          );
        },
        get updateExecutionStatus() {
          return new FieldNode(
            schema.UpdateExecutionStatusPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(
                    schema.UpdateExecutionStatusInput,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get updateStats() {
          return new FieldNode(
            schema.UpdateStatsPayload,
            new Arguments(
              {
                get input() {
                  return new ArgumentsField(schema.UpdateStatsInput, false);
                },
              },
              true
            ),
            true
          );
        },
      },
      { name: "Mutation", extension: ((extensions as any) || {}).Mutation }
    );
  },
  get CreateExecutionInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get execution() {
          return new InputNodeField(schema.ExecutionInput, false);
        },
      },
      { name: "CreateExecutionInput" }
    );
  },
  get ExecutionInput() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, false);
        },
        get status() {
          return new InputNodeField(schema.String, true);
        },
        get startedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
        get finishedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
      },
      { name: "ExecutionInput" }
    );
  },
  get CreateExecutionPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get executionEdge() {
          return new FieldNode(
            schema.ExecutionsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "CreateExecutionPayload",
        extension: ((extensions as any) || {}).CreateExecutionPayload,
      }
    );
  },
  get CreateLogInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get log() {
          return new InputNodeField(schema.LogInput, false);
        },
      },
      { name: "CreateLogInput" }
    );
  },
  get LogInput() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get executionId() {
          return new InputNodeField(schema.BigInt, false);
        },
        get time() {
          return new InputNodeField(schema.Datetime, true);
        },
        get message() {
          return new InputNodeField(schema.JSON, true);
        },
      },
      { name: "LogInput" }
    );
  },
  get CreateLogPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get log() {
          return new FieldNode(schema.Log, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get logEdge() {
          return new FieldNode(
            schema.LogsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "CreateLogPayload",
        extension: ((extensions as any) || {}).CreateLogPayload,
      }
    );
  },
  get CreateMigrationInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get migration() {
          return new InputNodeField(schema.MigrationInput, false);
        },
      },
      { name: "CreateMigrationInput" }
    );
  },
  get MigrationInput() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, false);
        },
        get name() {
          return new InputNodeField(schema.String, false);
        },
        get hash() {
          return new InputNodeField(schema.String, false);
        },
        get executedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
      },
      { name: "MigrationInput" }
    );
  },
  get CreateMigrationPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get migration() {
          return new FieldNode(schema.Migration, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get migrationEdge() {
          return new FieldNode(
            schema.MigrationsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.MigrationsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "CreateMigrationPayload",
        extension: ((extensions as any) || {}).CreateMigrationPayload,
      }
    );
  },
  get CreateTaskStatInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get taskStat() {
          return new InputNodeField(schema.TaskStatInput, false);
        },
      },
      { name: "CreateTaskStatInput" }
    );
  },
  get TaskStatInput() {
    return new InputNode(
      {
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get collection() {
          return new InputNodeField(schema.String, false);
        },
        get scheduled() {
          return new InputNodeField(schema.Int, true);
        },
        get pending() {
          return new InputNodeField(schema.Int, true);
        },
        get running() {
          return new InputNodeField(schema.Int, true);
        },
        get failure() {
          return new InputNodeField(schema.Int, true);
        },
        get timeout() {
          return new InputNodeField(schema.Int, true);
        },
        get success() {
          return new InputNodeField(schema.Int, true);
        },
        get locked() {
          return new InputNodeField(schema.Int, true);
        },
        get total() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "TaskStatInput" }
    );
  },
  get CreateTaskStatPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get taskStat() {
          return new FieldNode(schema.TaskStat, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get taskStatEdge() {
          return new FieldNode(
            schema.TaskStatsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "CreateTaskStatPayload",
        extension: ((extensions as any) || {}).CreateTaskStatPayload,
      }
    );
  },
  get CreateTaskInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get task() {
          return new InputNodeField(schema.TaskInput, false);
        },
      },
      { name: "CreateTaskInput" }
    );
  },
  get TaskInput() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get parentId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get name() {
          return new InputNodeField(schema.String, false);
        },
        get params() {
          return new InputNodeField(schema.JSON, true);
        },
        get context() {
          return new InputNodeField(schema.JSON, true);
        },
        get executeAt() {
          return new InputNodeField(schema.Datetime, true);
        },
        get priority() {
          return new InputNodeField(schema.Int, true);
        },
        get locked() {
          return new InputNodeField(schema.Boolean, true);
        },
        get status() {
          return new InputNodeField(schema.String, false);
        },
        get attempts() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "TaskInput" }
    );
  },
  get CreateTaskPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get parent() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get taskEdge() {
          return new FieldNode(
            schema.TasksEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "CreateTaskPayload",
        extension: ((extensions as any) || {}).CreateTaskPayload,
      }
    );
  },
  get UpdateExecutionByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
        get patch() {
          return new InputNodeField(schema.ExecutionPatch, false);
        },
      },
      { name: "UpdateExecutionByNodeIdInput" }
    );
  },
  get ExecutionPatch() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get status() {
          return new InputNodeField(schema.String, true);
        },
        get startedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
        get finishedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
      },
      { name: "ExecutionPatch" }
    );
  },
  get UpdateExecutionPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get executionEdge() {
          return new FieldNode(
            schema.ExecutionsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "UpdateExecutionPayload",
        extension: ((extensions as any) || {}).UpdateExecutionPayload,
      }
    );
  },
  get UpdateExecutionInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.ExecutionPatch, false);
        },
        get id() {
          return new InputNodeField(schema.BigInt, false);
        },
      },
      { name: "UpdateExecutionInput" }
    );
  },
  get UpdateLogByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
        get patch() {
          return new InputNodeField(schema.LogPatch, false);
        },
      },
      { name: "UpdateLogByNodeIdInput" }
    );
  },
  get LogPatch() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get executionId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get time() {
          return new InputNodeField(schema.Datetime, true);
        },
        get message() {
          return new InputNodeField(schema.JSON, true);
        },
      },
      { name: "LogPatch" }
    );
  },
  get UpdateLogPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get log() {
          return new FieldNode(schema.Log, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get logEdge() {
          return new FieldNode(
            schema.LogsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "UpdateLogPayload",
        extension: ((extensions as any) || {}).UpdateLogPayload,
      }
    );
  },
  get UpdateLogInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.LogPatch, false);
        },
        get id() {
          return new InputNodeField(schema.BigInt, false);
        },
      },
      { name: "UpdateLogInput" }
    );
  },
  get UpdateMigrationByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
        get patch() {
          return new InputNodeField(schema.MigrationPatch, false);
        },
      },
      { name: "UpdateMigrationByNodeIdInput" }
    );
  },
  get MigrationPatch() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, true);
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get hash() {
          return new InputNodeField(schema.String, true);
        },
        get executedAt() {
          return new InputNodeField(schema.Datetime, true);
        },
      },
      { name: "MigrationPatch" }
    );
  },
  get UpdateMigrationPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get migration() {
          return new FieldNode(schema.Migration, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get migrationEdge() {
          return new FieldNode(
            schema.MigrationsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.MigrationsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "UpdateMigrationPayload",
        extension: ((extensions as any) || {}).UpdateMigrationPayload,
      }
    );
  },
  get UpdateMigrationInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.MigrationPatch, false);
        },
        get id() {
          return new InputNodeField(schema.Int, false);
        },
      },
      { name: "UpdateMigrationInput" }
    );
  },
  get UpdateMigrationByNameInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.MigrationPatch, false);
        },
        get name() {
          return new InputNodeField(schema.String, false);
        },
      },
      { name: "UpdateMigrationByNameInput" }
    );
  },
  get UpdateTaskStatByTaskIdAndCollectionInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.TaskStatPatch, false);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, false);
        },
        get collection() {
          return new InputNodeField(schema.String, false);
        },
      },
      { name: "UpdateTaskStatByTaskIdAndCollectionInput" }
    );
  },
  get TaskStatPatch() {
    return new InputNode(
      {
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get collection() {
          return new InputNodeField(schema.String, true);
        },
        get scheduled() {
          return new InputNodeField(schema.Int, true);
        },
        get pending() {
          return new InputNodeField(schema.Int, true);
        },
        get running() {
          return new InputNodeField(schema.Int, true);
        },
        get failure() {
          return new InputNodeField(schema.Int, true);
        },
        get timeout() {
          return new InputNodeField(schema.Int, true);
        },
        get success() {
          return new InputNodeField(schema.Int, true);
        },
        get locked() {
          return new InputNodeField(schema.Int, true);
        },
        get total() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "TaskStatPatch" }
    );
  },
  get UpdateTaskStatPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get taskStat() {
          return new FieldNode(schema.TaskStat, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get taskStatEdge() {
          return new FieldNode(
            schema.TaskStatsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "UpdateTaskStatPayload",
        extension: ((extensions as any) || {}).UpdateTaskStatPayload,
      }
    );
  },
  get UpdateTaskByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
        get patch() {
          return new InputNodeField(schema.TaskPatch, false);
        },
      },
      { name: "UpdateTaskByNodeIdInput" }
    );
  },
  get TaskPatch() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.BigInt, true);
        },
        get parentId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get params() {
          return new InputNodeField(schema.JSON, true);
        },
        get context() {
          return new InputNodeField(schema.JSON, true);
        },
        get executeAt() {
          return new InputNodeField(schema.Datetime, true);
        },
        get priority() {
          return new InputNodeField(schema.Int, true);
        },
        get locked() {
          return new InputNodeField(schema.Boolean, true);
        },
        get status() {
          return new InputNodeField(schema.String, true);
        },
        get attempts() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "TaskPatch" }
    );
  },
  get UpdateTaskPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get parent() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get taskEdge() {
          return new FieldNode(
            schema.TasksEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "UpdateTaskPayload",
        extension: ((extensions as any) || {}).UpdateTaskPayload,
      }
    );
  },
  get UpdateTaskInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.TaskPatch, false);
        },
        get id() {
          return new InputNodeField(schema.BigInt, false);
        },
      },
      { name: "UpdateTaskInput" }
    );
  },
  get UpdateTaskByNameAndParamsAndContextAndExecuteAtInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get patch() {
          return new InputNodeField(schema.TaskPatch, false);
        },
        get name() {
          return new InputNodeField(schema.String, false);
        },
        get params() {
          return new InputNodeField(schema.JSON, false);
        },
        get context() {
          return new InputNodeField(schema.JSON, false);
        },
        get executeAt() {
          return new InputNodeField(schema.Datetime, false);
        },
      },
      { name: "UpdateTaskByNameAndParamsAndContextAndExecuteAtInput" }
    );
  },
  get DeleteExecutionByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
      },
      { name: "DeleteExecutionByNodeIdInput" }
    );
  },
  get DeleteExecutionPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get deletedExecutionNodeId() {
          return new FieldNode(schema.ID, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get executionEdge() {
          return new FieldNode(
            schema.ExecutionsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "DeleteExecutionPayload",
        extension: ((extensions as any) || {}).DeleteExecutionPayload,
      }
    );
  },
  get DeleteExecutionInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get id() {
          return new InputNodeField(schema.BigInt, false);
        },
      },
      { name: "DeleteExecutionInput" }
    );
  },
  get DeleteLogByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
      },
      { name: "DeleteLogByNodeIdInput" }
    );
  },
  get DeleteLogPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get log() {
          return new FieldNode(schema.Log, undefined, true);
        },
        get deletedLogNodeId() {
          return new FieldNode(schema.ID, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get logEdge() {
          return new FieldNode(
            schema.LogsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.LogsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "DeleteLogPayload",
        extension: ((extensions as any) || {}).DeleteLogPayload,
      }
    );
  },
  get DeleteLogInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get id() {
          return new InputNodeField(schema.BigInt, false);
        },
      },
      { name: "DeleteLogInput" }
    );
  },
  get DeleteMigrationByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
      },
      { name: "DeleteMigrationByNodeIdInput" }
    );
  },
  get DeleteMigrationPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get migration() {
          return new FieldNode(schema.Migration, undefined, true);
        },
        get deletedMigrationNodeId() {
          return new FieldNode(schema.ID, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get migrationEdge() {
          return new FieldNode(
            schema.MigrationsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.MigrationsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "DeleteMigrationPayload",
        extension: ((extensions as any) || {}).DeleteMigrationPayload,
      }
    );
  },
  get DeleteMigrationInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get id() {
          return new InputNodeField(schema.Int, false);
        },
      },
      { name: "DeleteMigrationInput" }
    );
  },
  get DeleteMigrationByNameInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get name() {
          return new InputNodeField(schema.String, false);
        },
      },
      { name: "DeleteMigrationByNameInput" }
    );
  },
  get DeleteTaskStatByTaskIdAndCollectionInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, false);
        },
        get collection() {
          return new InputNodeField(schema.String, false);
        },
      },
      { name: "DeleteTaskStatByTaskIdAndCollectionInput" }
    );
  },
  get DeleteTaskStatPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get taskStat() {
          return new FieldNode(schema.TaskStat, undefined, true);
        },
        get deletedTaskStatNodeId() {
          return new FieldNode(schema.ID, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get taskStatEdge() {
          return new FieldNode(
            schema.TaskStatsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TaskStatsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "DeleteTaskStatPayload",
        extension: ((extensions as any) || {}).DeleteTaskStatPayload,
      }
    );
  },
  get DeleteTaskByNodeIdInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get nodeId() {
          return new InputNodeField(schema.ID, false);
        },
      },
      { name: "DeleteTaskByNodeIdInput" }
    );
  },
  get DeleteTaskPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get deletedTaskNodeId() {
          return new FieldNode(schema.ID, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get parent() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get taskEdge() {
          return new FieldNode(
            schema.TasksEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.TasksOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "DeleteTaskPayload",
        extension: ((extensions as any) || {}).DeleteTaskPayload,
      }
    );
  },
  get DeleteTaskInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get id() {
          return new InputNodeField(schema.BigInt, false);
        },
      },
      { name: "DeleteTaskInput" }
    );
  },
  get DeleteTaskByNameAndParamsAndContextAndExecuteAtInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get name() {
          return new InputNodeField(schema.String, false);
        },
        get params() {
          return new InputNodeField(schema.JSON, false);
        },
        get context() {
          return new InputNodeField(schema.JSON, false);
        },
        get executeAt() {
          return new InputNodeField(schema.Datetime, false);
        },
      },
      { name: "DeleteTaskByNameAndParamsAndContextAndExecuteAtInput" }
    );
  },
  get ExecuteTaskInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get taskId() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "ExecuteTaskInput" }
    );
  },
  get ExecuteTaskPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get executionEdge() {
          return new FieldNode(
            schema.ExecutionsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "ExecuteTaskPayload",
        extension: ((extensions as any) || {}).ExecuteTaskPayload,
      }
    );
  },
  get IncTaskStatInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get collection() {
          return new InputNodeField(schema.String, true);
        },
        get colName() {
          return new InputNodeField(schema.String, true);
        },
        get value() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "IncTaskStatInput" }
    );
  },
  get IncTaskStatPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
      },
      {
        name: "IncTaskStatPayload",
        extension: ((extensions as any) || {}).IncTaskStatPayload,
      }
    );
  },
  get ProcessNextTaskInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get backoffDecay() {
          return new InputNodeField(schema.String, true);
        },
        get backoffDelay() {
          return new InputNodeField(schema.IntervalInput, true);
        },
        get concurrentExecutions() {
          return new InputNodeField(schema.Int, true);
        },
        get maxAttempts() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "ProcessNextTaskInput" }
    );
  },
  get IntervalInput() {
    return new InputNode(
      {
        get seconds() {
          return new InputNodeField(schema.Float, true);
        },
        get minutes() {
          return new InputNodeField(schema.Int, true);
        },
        get hours() {
          return new InputNodeField(schema.Int, true);
        },
        get days() {
          return new InputNodeField(schema.Int, true);
        },
        get months() {
          return new InputNodeField(schema.Int, true);
        },
        get years() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "IntervalInput" }
    );
  },
  get Float() {
    return new ScalarNode({
      name: "Float",
      extension: ((extensions as any) || {}).Float,
    });
  },
  get ProcessNextTaskPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get results() {
          return new FieldNode(
            new ArrayNode(schema.ProcessNextTaskRecord, true),
            undefined,
            true
          );
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
      },
      {
        name: "ProcessNextTaskPayload",
        extension: ((extensions as any) || {}).ProcessNextTaskPayload,
      }
    );
  },
  get ProcessNextTaskRecord() {
    return new ObjectNode(
      {
        get executionId() {
          return new FieldNode(schema.BigInt, undefined, true);
        },
        get taskName() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: "ProcessNextTaskRecord",
        extension: ((extensions as any) || {}).ProcessNextTaskRecord,
      }
    );
  },
  get UpdateExecutionStatusInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get newStatus() {
          return new InputNodeField(schema.String, true);
        },
        get executionId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get taskId() {
          return new InputNodeField(schema.BigInt, true);
        },
        get maxAttempts() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "UpdateExecutionStatusInput" }
    );
  },
  get UpdateExecutionStatusPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get execution() {
          return new FieldNode(schema.Execution, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
        get task() {
          return new FieldNode(schema.Task, undefined, true);
        },
        get executionEdge() {
          return new FieldNode(
            schema.ExecutionsEdge,
            new Arguments({
              get orderBy() {
                return new ArgumentsField(
                  new ArrayNode(schema.ExecutionsOrderBy, true),
                  true
                );
              },
            }),
            true
          );
        },
      },
      {
        name: "UpdateExecutionStatusPayload",
        extension: ((extensions as any) || {}).UpdateExecutionStatusPayload,
      }
    );
  },
  get UpdateStatsInput() {
    return new InputNode(
      {
        get clientMutationId() {
          return new InputNodeField(schema.String, true);
        },
        get op() {
          return new InputNodeField(schema.String, true);
        },
        get arg() {
          return new InputNodeField(schema.String, true);
        },
        get old() {
          return new InputNodeField(schema.TaskInput, true);
        },
        get new() {
          return new InputNodeField(schema.TaskInput, true);
        },
        get collection() {
          return new InputNodeField(schema.String, true);
        },
        get recurse() {
          return new InputNodeField(schema.Boolean, true);
        },
      },
      { name: "UpdateStatsInput" }
    );
  },
  get UpdateStatsPayload() {
    return new ObjectNode(
      {
        get clientMutationId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get query() {
          return new FieldNode(schema.Query, undefined, true);
        },
      },
      {
        name: "UpdateStatsPayload",
        extension: ((extensions as any) || {}).UpdateStatsPayload,
      }
    );
  },
  get __Schema() {
    return new ObjectNode(
      {
        get types() {
          return new FieldNode(
            new ArrayNode(schema.__Type, false),
            undefined,
            false
          );
        },
        get queryType() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get mutationType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get subscriptionType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get directives() {
          return new FieldNode(
            new ArrayNode(schema.__Directive, false),
            undefined,
            false
          );
        },
      },
      { name: "__Schema", extension: ((extensions as any) || {}).__Schema }
    );
  },
  get __Type() {
    return new ObjectNode(
      {
        get kind() {
          return new FieldNode(schema.__TypeKind, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get fields() {
          return new FieldNode(
            new ArrayNode(schema.__Field, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get interfaces() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
        get possibleTypes() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
        get enumValues() {
          return new FieldNode(
            new ArrayNode(schema.__EnumValue, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get inputFields() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, true),
            undefined,
            true
          );
        },
        get ofType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
      },
      { name: "__Type", extension: ((extensions as any) || {}).__Type }
    );
  },
  get __TypeKind() {
    return new EnumNode({ name: "__TypeKind" });
  },
  get __Field() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      { name: "__Field", extension: ((extensions as any) || {}).__Field }
    );
  },
  get __InputValue() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get defaultValue() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: "__InputValue",
        extension: ((extensions as any) || {}).__InputValue,
      }
    );
  },
  get __EnumValue() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      {
        name: "__EnumValue",
        extension: ((extensions as any) || {}).__EnumValue,
      }
    );
  },
  get __Directive() {
    return new ObjectNode(
      {
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locations() {
          return new FieldNode(
            new ArrayNode(schema.__DirectiveLocation, false),
            undefined,
            false
          );
        },
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
      },
      {
        name: "__Directive",
        extension: ((extensions as any) || {}).__Directive,
      }
    );
  },
  get __DirectiveLocation() {
    return new EnumNode({ name: "__DirectiveLocation" });
  },
};

lazyGetters(schema);
