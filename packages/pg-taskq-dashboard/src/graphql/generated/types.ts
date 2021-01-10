import * as extensions from "../extensions";
import {
  TypeData,
  FieldsType,
  FieldsTypeArg,
  ScalarType,
  EnumType,
} from "gqless";

type Extension<TName extends string> = TName extends keyof typeof extensions
  ? typeof extensions[TName]
  : any;

/**
 * @name Query
 * @type OBJECT
 * @implements Node
 */
type t_Query = FieldsType<
  {
    __typename: t_String<"Query">;

    /**
     * Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form.
     */
    query: t_Query;

    /**
     * The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`.
     */
    nodeId: t_ID;

    /**
     * Fetches an object given its globally unique `ID`.
     */
    node: FieldsTypeArg<{ nodeId: string }, t_Node | null>;

    /**
     * Reads and enables pagination through a set of `Execution`.
     */
    executionsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: ExecutionsOrderBy[] | null;
        condition?: ExecutionCondition | null;
      },
      t_ExecutionsConnection | null
    >;

    /**
     * Reads a set of `Execution`.
     */
    executions: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: ExecutionsOrderBy[] | null;
        condition?: ExecutionCondition | null;
      },
      t_Execution[] | null
    >;

    /**
     * Reads and enables pagination through a set of `Log`.
     */
    logsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: LogsOrderBy[] | null;
        condition?: LogCondition | null;
      },
      t_LogsConnection | null
    >;

    /**
     * Reads a set of `Log`.
     */
    logs: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: LogsOrderBy[] | null;
        condition?: LogCondition | null;
      },
      t_Log[] | null
    >;

    /**
     * Reads and enables pagination through a set of `Migration`.
     */
    migrationsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: MigrationsOrderBy[] | null;
        condition?: MigrationCondition | null;
      },
      t_MigrationsConnection | null
    >;

    /**
     * Reads a set of `Migration`.
     */
    migrations: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: MigrationsOrderBy[] | null;
        condition?: MigrationCondition | null;
      },
      t_Migration[] | null
    >;

    /**
     * Reads and enables pagination through a set of `TaskStat`.
     */
    taskStatsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: TaskStatsOrderBy[] | null;
        condition?: TaskStatCondition | null;
      },
      t_TaskStatsConnection | null
    >;

    /**
     * Reads a set of `TaskStat`.
     */
    taskStats: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: TaskStatsOrderBy[] | null;
        condition?: TaskStatCondition | null;
      },
      t_TaskStat[] | null
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    tasksConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      t_TasksConnection | null
    >;

    /**
     * Reads a set of `Task`.
     */
    tasks: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      t_Task[] | null
    >;
    execution: FieldsTypeArg<{ id: any }, t_Execution | null>;
    log: FieldsTypeArg<{ id: any }, t_Log | null>;
    migration: FieldsTypeArg<{ id: number }, t_Migration | null>;
    migrationByName: FieldsTypeArg<{ name: string }, t_Migration | null>;
    taskStatByTaskIdAndCollection: FieldsTypeArg<
      { taskId: any; collection: string },
      t_TaskStat | null
    >;
    task: FieldsTypeArg<{ id: any }, t_Task | null>;
    taskByNameAndParamsAndContextAndExecuteAt: FieldsTypeArg<
      {
        name: string;
        params: { [K: string]: any };
        context: { [K: string]: any };
        executeAt: any;
      },
      t_Task | null
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    childTasksConnection: FieldsTypeArg<
      {
        taskId?: any | null;
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      t_TasksConnection
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    childTasks: FieldsTypeArg<
      {
        taskId?: any | null;
        first?: number | null;
        offset?: number | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      (t_Task | null)[]
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    descendantTasksConnection: FieldsTypeArg<
      {
        taskId?: any | null;
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      t_TasksConnection
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    descendantTasks: FieldsTypeArg<
      {
        taskId?: any | null;
        first?: number | null;
        offset?: number | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      (t_Task | null)[]
    >;
    rootChildrenStats?: t_JSON | null;
    rootDescendantsStats?: t_JSON | null;

    /**
     * Reads a single `Execution` using its globally unique `ID`.
     */
    executionByNodeId: FieldsTypeArg<{ nodeId: string }, t_Execution | null>;

    /**
     * Reads a single `Log` using its globally unique `ID`.
     */
    logByNodeId: FieldsTypeArg<{ nodeId: string }, t_Log | null>;

    /**
     * Reads a single `Migration` using its globally unique `ID`.
     */
    migrationByNodeId: FieldsTypeArg<{ nodeId: string }, t_Migration | null>;

    /**
     * Reads a single `Task` using its globally unique `ID`.
     */
    taskByNodeId: FieldsTypeArg<{ nodeId: string }, t_Task | null>;
  },
  Extension<"Query">
>;

/**
 * @name Node
 * @type INTERFACE
 */
type t_Node = t_Query | t_Execution | t_Task | t_Log | t_Migration;

/**
 * @name ID
 * @type SCALAR
 */
type t_ID<T extends string = string> = ScalarType<T, Extension<"ID">>;

/**
 * @name Int
 * @type SCALAR
 */
type t_Int<T extends number = number> = ScalarType<T, Extension<"Int">>;

/**
 * @name Cursor
 * @type SCALAR
 */
type t_Cursor<T extends any = any> = ScalarType<T, Extension<"Cursor">>;

/**
 * @name ExecutionsOrderBy
 * @type ENUM
 */
type t_ExecutionsOrderBy = EnumType<
  | "NATURAL"
  | "ID_ASC"
  | "ID_DESC"
  | "TASK_ID_ASC"
  | "TASK_ID_DESC"
  | "STATUS_ASC"
  | "STATUS_DESC"
  | "STARTED_AT_ASC"
  | "STARTED_AT_DESC"
  | "FINISHED_AT_ASC"
  | "FINISHED_AT_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC"
>;

/**
 * @name ExecutionCondition
 * @type INPUT_OBJECT
 */
export type ExecutionCondition = {
  id?: any | null;
  taskId?: any | null;
  status?: string | null;
  startedAt?: any | null;
  finishedAt?: any | null;
};

/**
 * @name BigInt
 * @type SCALAR
 */
type t_BigInt<T extends any = any> = ScalarType<T, Extension<"BigInt">>;

/**
 * @name String
 * @type SCALAR
 */
type t_String<T extends string = string> = ScalarType<T, Extension<"String">>;

/**
 * @name Datetime
 * @type SCALAR
 */
type t_Datetime<T extends any = any> = ScalarType<T, Extension<"Datetime">>;

/**
 * @name ExecutionsConnection
 * @type OBJECT
 */
type t_ExecutionsConnection = FieldsType<
  {
    __typename: t_String<"ExecutionsConnection">;

    /**
     * A list of `Execution` objects.
     */
    nodes: (t_Execution | null)[];

    /**
     * A list of edges which contains the `Execution` and cursor to aid in pagination.
     */
    edges: t_ExecutionsEdge[];

    /**
     * Information to aid in pagination.
     */
    pageInfo: t_PageInfo;

    /**
     * The count of *all* `Execution` you could get from the connection.
     */
    totalCount: t_Int;
  },
  Extension<"ExecutionsConnection">
>;

/**
 * @name Execution
 * @type OBJECT
 * @implements Node
 */
type t_Execution = FieldsType<
  {
    __typename: t_String<"Execution">;

    /**
     * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
     */
    nodeId: t_ID;
    id: t_BigInt;
    taskId: t_BigInt;
    status: t_String;
    startedAt: t_Datetime;
    finishedAt?: t_Datetime | null;

    /**
     * Reads a single `Task` that is related to this `Execution`.
     */
    task?: t_Task | null;

    /**
     * Reads and enables pagination through a set of `Log`.
     */
    logsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: LogsOrderBy[] | null;
        condition?: LogCondition | null;
      },
      t_LogsConnection
    >;

    /**
     * Reads and enables pagination through a set of `Log`.
     */
    logs: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: LogsOrderBy[] | null;
        condition?: LogCondition | null;
      },
      t_Log[]
    >;
    duration?: t_String | null;
  },
  Extension<"Execution">
>;

/**
 * @name Task
 * @type OBJECT
 * @implements Node
 */
type t_Task = FieldsType<
  {
    __typename: t_String<"Task">;

    /**
     * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
     */
    nodeId: t_ID;
    id: t_BigInt;
    parentId?: t_BigInt | null;
    name: t_String;
    params: t_JSON;
    context: t_JSON;
    executeAt: t_Datetime;
    priority: t_Int;
    locked: t_Boolean;
    status: t_String;
    attempts: t_Int;

    /**
     * Reads a single `Task` that is related to this `Task`.
     */
    parent?: t_Task | null;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    childTasksConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      t_TasksConnection
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    childTasks: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: TasksOrderBy[] | null;
        condition?: TaskCondition | null;
      },
      t_Task[]
    >;

    /**
     * Reads and enables pagination through a set of `TaskStat`.
     */
    taskStatsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: TaskStatsOrderBy[] | null;
        condition?: TaskStatCondition | null;
      },
      t_TaskStatsConnection
    >;

    /**
     * Reads and enables pagination through a set of `TaskStat`.
     */
    taskStats: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: TaskStatsOrderBy[] | null;
        condition?: TaskStatCondition | null;
      },
      t_TaskStat[]
    >;

    /**
     * Reads and enables pagination through a set of `Execution`.
     */
    executionsConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: ExecutionsOrderBy[] | null;
        condition?: ExecutionCondition | null;
      },
      t_ExecutionsConnection
    >;

    /**
     * Reads and enables pagination through a set of `Execution`.
     */
    executions: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: ExecutionsOrderBy[] | null;
        condition?: ExecutionCondition | null;
      },
      t_Execution[]
    >;
    childrenStats?: t_JSON | null;
    complete?: t_Boolean | null;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    descendantTasksConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
      },
      t_TasksConnection
    >;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    descendantTasks: FieldsTypeArg<
      { first?: number | null; offset?: number | null },
      (t_Task | null)[]
    >;
    descendantsStats?: t_JSON | null;
    lastExecuted?: t_Datetime | null;
    latestExecution?: t_Execution | null;
  },
  Extension<"Task">
>;

/**
 * @name JSON
 * @type SCALAR
 */
type t_JSON<T extends { [K: string]: any } = { [K: string]: any }> = ScalarType<
  T,
  Extension<"JSON">
>;

/**
 * @name Boolean
 * @type SCALAR
 */
type t_Boolean<T extends boolean = boolean> = ScalarType<
  T,
  Extension<"Boolean">
>;

/**
 * @name TasksOrderBy
 * @type ENUM
 */
type t_TasksOrderBy = EnumType<
  | "NATURAL"
  | "ID_ASC"
  | "ID_DESC"
  | "PARENT_ID_ASC"
  | "PARENT_ID_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "PARAMS_ASC"
  | "PARAMS_DESC"
  | "CONTEXT_ASC"
  | "CONTEXT_DESC"
  | "EXECUTE_AT_ASC"
  | "EXECUTE_AT_DESC"
  | "PRIORITY_ASC"
  | "PRIORITY_DESC"
  | "LOCKED_ASC"
  | "LOCKED_DESC"
  | "STATUS_ASC"
  | "STATUS_DESC"
  | "ATTEMPTS_ASC"
  | "ATTEMPTS_DESC"
  | "LAST_EXECUTED_ASC"
  | "LAST_EXECUTED_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC"
>;

/**
 * @name TaskCondition
 * @type INPUT_OBJECT
 */
export type TaskCondition = {
  id?: any | null;
  parentId?: any | null;
  name?: string | null;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  priority?: number | null;
  locked?: boolean | null;
  status?: string | null;
  attempts?: number | null;
};

/**
 * @name TasksConnection
 * @type OBJECT
 */
type t_TasksConnection = FieldsType<
  {
    __typename: t_String<"TasksConnection">;

    /**
     * A list of `Task` objects.
     */
    nodes: (t_Task | null)[];

    /**
     * A list of edges which contains the `Task` and cursor to aid in pagination.
     */
    edges: t_TasksEdge[];

    /**
     * Information to aid in pagination.
     */
    pageInfo: t_PageInfo;

    /**
     * The count of *all* `Task` you could get from the connection.
     */
    totalCount: t_Int;
  },
  Extension<"TasksConnection">
>;

/**
 * @name TasksEdge
 * @type OBJECT
 */
type t_TasksEdge = FieldsType<
  {
    __typename: t_String<"TasksEdge">;

    /**
     * A cursor for use in pagination.
     */
    cursor?: t_Cursor | null;

    /**
     * The `Task` at the end of the edge.
     */
    node?: t_Task | null;
  },
  Extension<"TasksEdge">
>;

/**
 * @name PageInfo
 * @type OBJECT
 */
type t_PageInfo = FieldsType<
  {
    __typename: t_String<"PageInfo">;

    /**
     * When paginating forwards, are there more items?
     */
    hasNextPage: t_Boolean;

    /**
     * When paginating backwards, are there more items?
     */
    hasPreviousPage: t_Boolean;

    /**
     * When paginating backwards, the cursor to continue.
     */
    startCursor?: t_Cursor | null;

    /**
     * When paginating forwards, the cursor to continue.
     */
    endCursor?: t_Cursor | null;
  },
  Extension<"PageInfo">
>;

/**
 * @name TaskStatsOrderBy
 * @type ENUM
 */
type t_TaskStatsOrderBy = EnumType<
  | "NATURAL"
  | "TASK_ID_ASC"
  | "TASK_ID_DESC"
  | "COLLECTION_ASC"
  | "COLLECTION_DESC"
  | "SCHEDULED_ASC"
  | "SCHEDULED_DESC"
  | "PENDING_ASC"
  | "PENDING_DESC"
  | "RUNNING_ASC"
  | "RUNNING_DESC"
  | "FAILURE_ASC"
  | "FAILURE_DESC"
  | "TIMEOUT_ASC"
  | "TIMEOUT_DESC"
  | "SUCCESS_ASC"
  | "SUCCESS_DESC"
  | "LOCKED_ASC"
  | "LOCKED_DESC"
  | "TOTAL_ASC"
  | "TOTAL_DESC"
>;

/**
 * @name TaskStatCondition
 * @type INPUT_OBJECT
 */
export type TaskStatCondition = {
  taskId?: any | null;
  collection?: string | null;
  scheduled?: number | null;
  pending?: number | null;
  running?: number | null;
  failure?: number | null;
  timeout?: number | null;
  success?: number | null;
  locked?: number | null;
  total?: number | null;
};

/**
 * @name TaskStatsConnection
 * @type OBJECT
 */
type t_TaskStatsConnection = FieldsType<
  {
    __typename: t_String<"TaskStatsConnection">;

    /**
     * A list of `TaskStat` objects.
     */
    nodes: (t_TaskStat | null)[];

    /**
     * A list of edges which contains the `TaskStat` and cursor to aid in pagination.
     */
    edges: t_TaskStatsEdge[];

    /**
     * Information to aid in pagination.
     */
    pageInfo: t_PageInfo;

    /**
     * The count of *all* `TaskStat` you could get from the connection.
     */
    totalCount: t_Int;
  },
  Extension<"TaskStatsConnection">
>;

/**
 * @name TaskStat
 * @type OBJECT
 */
type t_TaskStat = FieldsType<
  {
    __typename: t_String<"TaskStat">;
    taskId?: t_BigInt | null;
    collection: t_String;
    scheduled: t_Int;
    pending: t_Int;
    running: t_Int;
    failure: t_Int;
    timeout: t_Int;
    success: t_Int;
    locked: t_Int;
    total: t_Int;

    /**
     * Reads a single `Task` that is related to this `TaskStat`.
     */
    task?: t_Task | null;
  },
  Extension<"TaskStat">
>;

/**
 * @name TaskStatsEdge
 * @type OBJECT
 */
type t_TaskStatsEdge = FieldsType<
  {
    __typename: t_String<"TaskStatsEdge">;

    /**
     * A cursor for use in pagination.
     */
    cursor?: t_Cursor | null;

    /**
     * The `TaskStat` at the end of the edge.
     */
    node?: t_TaskStat | null;
  },
  Extension<"TaskStatsEdge">
>;

/**
 * @name LogsOrderBy
 * @type ENUM
 */
type t_LogsOrderBy = EnumType<
  | "NATURAL"
  | "ID_ASC"
  | "ID_DESC"
  | "EXECUTION_ID_ASC"
  | "EXECUTION_ID_DESC"
  | "TIME_ASC"
  | "TIME_DESC"
  | "MESSAGE_ASC"
  | "MESSAGE_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC"
>;

/**
 * @name LogCondition
 * @type INPUT_OBJECT
 */
export type LogCondition = {
  id?: any | null;
  executionId?: any | null;
  time?: any | null;
  message?: { [K: string]: any } | null;
};

/**
 * @name LogsConnection
 * @type OBJECT
 */
type t_LogsConnection = FieldsType<
  {
    __typename: t_String<"LogsConnection">;

    /**
     * A list of `Log` objects.
     */
    nodes: (t_Log | null)[];

    /**
     * A list of edges which contains the `Log` and cursor to aid in pagination.
     */
    edges: t_LogsEdge[];

    /**
     * Information to aid in pagination.
     */
    pageInfo: t_PageInfo;

    /**
     * The count of *all* `Log` you could get from the connection.
     */
    totalCount: t_Int;
  },
  Extension<"LogsConnection">
>;

/**
 * @name Log
 * @type OBJECT
 * @implements Node
 */
type t_Log = FieldsType<
  {
    __typename: t_String<"Log">;

    /**
     * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
     */
    nodeId: t_ID;
    id: t_BigInt;
    executionId: t_BigInt;
    time: t_Datetime;
    message?: t_JSON | null;

    /**
     * Reads a single `Execution` that is related to this `Log`.
     */
    execution?: t_Execution | null;
    messageParsed?: t_String | null;
  },
  Extension<"Log">
>;

/**
 * @name LogsEdge
 * @type OBJECT
 */
type t_LogsEdge = FieldsType<
  {
    __typename: t_String<"LogsEdge">;

    /**
     * A cursor for use in pagination.
     */
    cursor?: t_Cursor | null;

    /**
     * The `Log` at the end of the edge.
     */
    node?: t_Log | null;
  },
  Extension<"LogsEdge">
>;

/**
 * @name ExecutionsEdge
 * @type OBJECT
 */
type t_ExecutionsEdge = FieldsType<
  {
    __typename: t_String<"ExecutionsEdge">;

    /**
     * A cursor for use in pagination.
     */
    cursor?: t_Cursor | null;

    /**
     * The `Execution` at the end of the edge.
     */
    node?: t_Execution | null;
  },
  Extension<"ExecutionsEdge">
>;

/**
 * @name MigrationsOrderBy
 * @type ENUM
 */
type t_MigrationsOrderBy = EnumType<
  | "NATURAL"
  | "ID_ASC"
  | "ID_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "HASH_ASC"
  | "HASH_DESC"
  | "EXECUTED_AT_ASC"
  | "EXECUTED_AT_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC"
>;

/**
 * @name MigrationCondition
 * @type INPUT_OBJECT
 */
export type MigrationCondition = {
  id?: number | null;
  name?: string | null;
  hash?: string | null;
  executedAt?: any | null;
};

/**
 * @name MigrationsConnection
 * @type OBJECT
 */
type t_MigrationsConnection = FieldsType<
  {
    __typename: t_String<"MigrationsConnection">;

    /**
     * A list of `Migration` objects.
     */
    nodes: (t_Migration | null)[];

    /**
     * A list of edges which contains the `Migration` and cursor to aid in pagination.
     */
    edges: t_MigrationsEdge[];

    /**
     * Information to aid in pagination.
     */
    pageInfo: t_PageInfo;

    /**
     * The count of *all* `Migration` you could get from the connection.
     */
    totalCount: t_Int;
  },
  Extension<"MigrationsConnection">
>;

/**
 * @name Migration
 * @type OBJECT
 * @implements Node
 */
type t_Migration = FieldsType<
  {
    __typename: t_String<"Migration">;

    /**
     * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
     */
    nodeId: t_ID;
    id: t_Int;
    name: t_String;
    hash: t_String;
    executedAt?: t_Datetime | null;
  },
  Extension<"Migration">
>;

/**
 * @name MigrationsEdge
 * @type OBJECT
 */
type t_MigrationsEdge = FieldsType<
  {
    __typename: t_String<"MigrationsEdge">;

    /**
     * A cursor for use in pagination.
     */
    cursor?: t_Cursor | null;

    /**
     * The `Migration` at the end of the edge.
     */
    node?: t_Migration | null;
  },
  Extension<"MigrationsEdge">
>;

/**
 * @name Mutation
 * @type OBJECT
 */
type t_Mutation = FieldsType<
  {
    __typename: t_String<"Mutation">;

    /**
     * Creates a single `Execution`.
     */
    createExecution: FieldsTypeArg<
      { input: CreateExecutionInput },
      t_CreateExecutionPayload | null
    >;

    /**
     * Creates a single `Log`.
     */
    createLog: FieldsTypeArg<
      { input: CreateLogInput },
      t_CreateLogPayload | null
    >;

    /**
     * Creates a single `Migration`.
     */
    createMigration: FieldsTypeArg<
      { input: CreateMigrationInput },
      t_CreateMigrationPayload | null
    >;

    /**
     * Creates a single `TaskStat`.
     */
    createTaskStat: FieldsTypeArg<
      { input: CreateTaskStatInput },
      t_CreateTaskStatPayload | null
    >;

    /**
     * Creates a single `Task`.
     */
    createTask: FieldsTypeArg<
      { input: CreateTaskInput },
      t_CreateTaskPayload | null
    >;

    /**
     * Updates a single `Execution` using its globally unique id and a patch.
     */
    updateExecutionByNodeId: FieldsTypeArg<
      { input: UpdateExecutionByNodeIdInput },
      t_UpdateExecutionPayload | null
    >;

    /**
     * Updates a single `Execution` using a unique key and a patch.
     */
    updateExecution: FieldsTypeArg<
      { input: UpdateExecutionInput },
      t_UpdateExecutionPayload | null
    >;

    /**
     * Updates a single `Log` using its globally unique id and a patch.
     */
    updateLogByNodeId: FieldsTypeArg<
      { input: UpdateLogByNodeIdInput },
      t_UpdateLogPayload | null
    >;

    /**
     * Updates a single `Log` using a unique key and a patch.
     */
    updateLog: FieldsTypeArg<
      { input: UpdateLogInput },
      t_UpdateLogPayload | null
    >;

    /**
     * Updates a single `Migration` using its globally unique id and a patch.
     */
    updateMigrationByNodeId: FieldsTypeArg<
      { input: UpdateMigrationByNodeIdInput },
      t_UpdateMigrationPayload | null
    >;

    /**
     * Updates a single `Migration` using a unique key and a patch.
     */
    updateMigration: FieldsTypeArg<
      { input: UpdateMigrationInput },
      t_UpdateMigrationPayload | null
    >;

    /**
     * Updates a single `Migration` using a unique key and a patch.
     */
    updateMigrationByName: FieldsTypeArg<
      { input: UpdateMigrationByNameInput },
      t_UpdateMigrationPayload | null
    >;

    /**
     * Updates a single `TaskStat` using a unique key and a patch.
     */
    updateTaskStatByTaskIdAndCollection: FieldsTypeArg<
      { input: UpdateTaskStatByTaskIdAndCollectionInput },
      t_UpdateTaskStatPayload | null
    >;

    /**
     * Updates a single `Task` using its globally unique id and a patch.
     */
    updateTaskByNodeId: FieldsTypeArg<
      { input: UpdateTaskByNodeIdInput },
      t_UpdateTaskPayload | null
    >;

    /**
     * Updates a single `Task` using a unique key and a patch.
     */
    updateTask: FieldsTypeArg<
      { input: UpdateTaskInput },
      t_UpdateTaskPayload | null
    >;

    /**
     * Updates a single `Task` using a unique key and a patch.
     */
    updateTaskByNameAndParamsAndContextAndExecuteAt: FieldsTypeArg<
      { input: UpdateTaskByNameAndParamsAndContextAndExecuteAtInput },
      t_UpdateTaskPayload | null
    >;

    /**
     * Deletes a single `Execution` using its globally unique id.
     */
    deleteExecutionByNodeId: FieldsTypeArg<
      { input: DeleteExecutionByNodeIdInput },
      t_DeleteExecutionPayload | null
    >;

    /**
     * Deletes a single `Execution` using a unique key.
     */
    deleteExecution: FieldsTypeArg<
      { input: DeleteExecutionInput },
      t_DeleteExecutionPayload | null
    >;

    /**
     * Deletes a single `Log` using its globally unique id.
     */
    deleteLogByNodeId: FieldsTypeArg<
      { input: DeleteLogByNodeIdInput },
      t_DeleteLogPayload | null
    >;

    /**
     * Deletes a single `Log` using a unique key.
     */
    deleteLog: FieldsTypeArg<
      { input: DeleteLogInput },
      t_DeleteLogPayload | null
    >;

    /**
     * Deletes a single `Migration` using its globally unique id.
     */
    deleteMigrationByNodeId: FieldsTypeArg<
      { input: DeleteMigrationByNodeIdInput },
      t_DeleteMigrationPayload | null
    >;

    /**
     * Deletes a single `Migration` using a unique key.
     */
    deleteMigration: FieldsTypeArg<
      { input: DeleteMigrationInput },
      t_DeleteMigrationPayload | null
    >;

    /**
     * Deletes a single `Migration` using a unique key.
     */
    deleteMigrationByName: FieldsTypeArg<
      { input: DeleteMigrationByNameInput },
      t_DeleteMigrationPayload | null
    >;

    /**
     * Deletes a single `TaskStat` using a unique key.
     */
    deleteTaskStatByTaskIdAndCollection: FieldsTypeArg<
      { input: DeleteTaskStatByTaskIdAndCollectionInput },
      t_DeleteTaskStatPayload | null
    >;

    /**
     * Deletes a single `Task` using its globally unique id.
     */
    deleteTaskByNodeId: FieldsTypeArg<
      { input: DeleteTaskByNodeIdInput },
      t_DeleteTaskPayload | null
    >;

    /**
     * Deletes a single `Task` using a unique key.
     */
    deleteTask: FieldsTypeArg<
      { input: DeleteTaskInput },
      t_DeleteTaskPayload | null
    >;

    /**
     * Deletes a single `Task` using a unique key.
     */
    deleteTaskByNameAndParamsAndContextAndExecuteAt: FieldsTypeArg<
      { input: DeleteTaskByNameAndParamsAndContextAndExecuteAtInput },
      t_DeleteTaskPayload | null
    >;
    executeTask: FieldsTypeArg<
      { input: ExecuteTaskInput },
      t_ExecuteTaskPayload | null
    >;
    incTaskStat: FieldsTypeArg<
      { input: IncTaskStatInput },
      t_IncTaskStatPayload | null
    >;
    processNextTask: FieldsTypeArg<
      { input: ProcessNextTaskInput },
      t_ProcessNextTaskPayload | null
    >;
    updateExecutionStatus: FieldsTypeArg<
      { input: UpdateExecutionStatusInput },
      t_UpdateExecutionStatusPayload | null
    >;
    updateStats: FieldsTypeArg<
      { input: UpdateStatsInput },
      t_UpdateStatsPayload | null
    >;
  },
  Extension<"Mutation">
>;

/**
 * @name CreateExecutionInput
 * @type INPUT_OBJECT
 */
export type CreateExecutionInput = {
  clientMutationId?: string | null;
  execution: ExecutionInput;
};

/**
 * @name ExecutionInput
 * @type INPUT_OBJECT
 */
export type ExecutionInput = {
  id?: any | null;
  taskId: any;
  status?: string | null;
  startedAt?: any | null;
  finishedAt?: any | null;
};

/**
 * @name CreateExecutionPayload
 * @type OBJECT
 */
type t_CreateExecutionPayload = FieldsType<
  {
    __typename: t_String<"CreateExecutionPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Execution` that was created by this mutation.
     */
    execution?: t_Execution | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Execution`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `Execution`. May be used by Relay 1.
     */
    executionEdge: FieldsTypeArg<
      { orderBy?: ExecutionsOrderBy[] | null },
      t_ExecutionsEdge | null
    >;
  },
  Extension<"CreateExecutionPayload">
>;

/**
 * @name CreateLogInput
 * @type INPUT_OBJECT
 */
export type CreateLogInput = {
  clientMutationId?: string | null;
  log: LogInput;
};

/**
 * @name LogInput
 * @type INPUT_OBJECT
 */
export type LogInput = {
  id?: any | null;
  executionId: any;
  time?: any | null;
  message?: { [K: string]: any } | null;
};

/**
 * @name CreateLogPayload
 * @type OBJECT
 */
type t_CreateLogPayload = FieldsType<
  {
    __typename: t_String<"CreateLogPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Log` that was created by this mutation.
     */
    log?: t_Log | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Execution` that is related to this `Log`.
     */
    execution?: t_Execution | null;

    /**
     * An edge for our `Log`. May be used by Relay 1.
     */
    logEdge: FieldsTypeArg<
      { orderBy?: LogsOrderBy[] | null },
      t_LogsEdge | null
    >;
  },
  Extension<"CreateLogPayload">
>;

/**
 * @name CreateMigrationInput
 * @type INPUT_OBJECT
 */
export type CreateMigrationInput = {
  clientMutationId?: string | null;
  migration: MigrationInput;
};

/**
 * @name MigrationInput
 * @type INPUT_OBJECT
 */
export type MigrationInput = {
  id: number;
  name: string;
  hash: string;
  executedAt?: any | null;
};

/**
 * @name CreateMigrationPayload
 * @type OBJECT
 */
type t_CreateMigrationPayload = FieldsType<
  {
    __typename: t_String<"CreateMigrationPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Migration` that was created by this mutation.
     */
    migration?: t_Migration | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * An edge for our `Migration`. May be used by Relay 1.
     */
    migrationEdge: FieldsTypeArg<
      { orderBy?: MigrationsOrderBy[] | null },
      t_MigrationsEdge | null
    >;
  },
  Extension<"CreateMigrationPayload">
>;

/**
 * @name CreateTaskStatInput
 * @type INPUT_OBJECT
 */
export type CreateTaskStatInput = {
  clientMutationId?: string | null;
  taskStat: TaskStatInput;
};

/**
 * @name TaskStatInput
 * @type INPUT_OBJECT
 */
export type TaskStatInput = {
  taskId?: any | null;
  collection: string;
  scheduled?: number | null;
  pending?: number | null;
  running?: number | null;
  failure?: number | null;
  timeout?: number | null;
  success?: number | null;
  locked?: number | null;
  total?: number | null;
};

/**
 * @name CreateTaskStatPayload
 * @type OBJECT
 */
type t_CreateTaskStatPayload = FieldsType<
  {
    __typename: t_String<"CreateTaskStatPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `TaskStat` that was created by this mutation.
     */
    taskStat?: t_TaskStat | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `TaskStat`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `TaskStat`. May be used by Relay 1.
     */
    taskStatEdge: FieldsTypeArg<
      { orderBy?: TaskStatsOrderBy[] | null },
      t_TaskStatsEdge | null
    >;
  },
  Extension<"CreateTaskStatPayload">
>;

/**
 * @name CreateTaskInput
 * @type INPUT_OBJECT
 */
export type CreateTaskInput = {
  clientMutationId?: string | null;
  task: TaskInput;
};

/**
 * @name TaskInput
 * @type INPUT_OBJECT
 */
export type TaskInput = {
  id?: any | null;
  parentId?: any | null;
  name: string;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  priority?: number | null;
  locked?: boolean | null;
  status: string;
  attempts?: number | null;
};

/**
 * @name CreateTaskPayload
 * @type OBJECT
 */
type t_CreateTaskPayload = FieldsType<
  {
    __typename: t_String<"CreateTaskPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Task` that was created by this mutation.
     */
    task?: t_Task | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Task`.
     */
    parent?: t_Task | null;

    /**
     * An edge for our `Task`. May be used by Relay 1.
     */
    taskEdge: FieldsTypeArg<
      { orderBy?: TasksOrderBy[] | null },
      t_TasksEdge | null
    >;
  },
  Extension<"CreateTaskPayload">
>;

/**
 * @name UpdateExecutionByNodeIdInput
 * @type INPUT_OBJECT
 */
export type UpdateExecutionByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
  patch: ExecutionPatch;
};

/**
 * @name ExecutionPatch
 * @type INPUT_OBJECT
 */
export type ExecutionPatch = {
  id?: any | null;
  taskId?: any | null;
  status?: string | null;
  startedAt?: any | null;
  finishedAt?: any | null;
};

/**
 * @name UpdateExecutionPayload
 * @type OBJECT
 */
type t_UpdateExecutionPayload = FieldsType<
  {
    __typename: t_String<"UpdateExecutionPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Execution` that was updated by this mutation.
     */
    execution?: t_Execution | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Execution`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `Execution`. May be used by Relay 1.
     */
    executionEdge: FieldsTypeArg<
      { orderBy?: ExecutionsOrderBy[] | null },
      t_ExecutionsEdge | null
    >;
  },
  Extension<"UpdateExecutionPayload">
>;

/**
 * @name UpdateExecutionInput
 * @type INPUT_OBJECT
 */
export type UpdateExecutionInput = {
  clientMutationId?: string | null;
  patch: ExecutionPatch;
  id: any;
};

/**
 * @name UpdateLogByNodeIdInput
 * @type INPUT_OBJECT
 */
export type UpdateLogByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
  patch: LogPatch;
};

/**
 * @name LogPatch
 * @type INPUT_OBJECT
 */
export type LogPatch = {
  id?: any | null;
  executionId?: any | null;
  time?: any | null;
  message?: { [K: string]: any } | null;
};

/**
 * @name UpdateLogPayload
 * @type OBJECT
 */
type t_UpdateLogPayload = FieldsType<
  {
    __typename: t_String<"UpdateLogPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Log` that was updated by this mutation.
     */
    log?: t_Log | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Execution` that is related to this `Log`.
     */
    execution?: t_Execution | null;

    /**
     * An edge for our `Log`. May be used by Relay 1.
     */
    logEdge: FieldsTypeArg<
      { orderBy?: LogsOrderBy[] | null },
      t_LogsEdge | null
    >;
  },
  Extension<"UpdateLogPayload">
>;

/**
 * @name UpdateLogInput
 * @type INPUT_OBJECT
 */
export type UpdateLogInput = {
  clientMutationId?: string | null;
  patch: LogPatch;
  id: any;
};

/**
 * @name UpdateMigrationByNodeIdInput
 * @type INPUT_OBJECT
 */
export type UpdateMigrationByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
  patch: MigrationPatch;
};

/**
 * @name MigrationPatch
 * @type INPUT_OBJECT
 */
export type MigrationPatch = {
  id?: number | null;
  name?: string | null;
  hash?: string | null;
  executedAt?: any | null;
};

/**
 * @name UpdateMigrationPayload
 * @type OBJECT
 */
type t_UpdateMigrationPayload = FieldsType<
  {
    __typename: t_String<"UpdateMigrationPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Migration` that was updated by this mutation.
     */
    migration?: t_Migration | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * An edge for our `Migration`. May be used by Relay 1.
     */
    migrationEdge: FieldsTypeArg<
      { orderBy?: MigrationsOrderBy[] | null },
      t_MigrationsEdge | null
    >;
  },
  Extension<"UpdateMigrationPayload">
>;

/**
 * @name UpdateMigrationInput
 * @type INPUT_OBJECT
 */
export type UpdateMigrationInput = {
  clientMutationId?: string | null;
  patch: MigrationPatch;
  id: number;
};

/**
 * @name UpdateMigrationByNameInput
 * @type INPUT_OBJECT
 */
export type UpdateMigrationByNameInput = {
  clientMutationId?: string | null;
  patch: MigrationPatch;
  name: string;
};

/**
 * @name UpdateTaskStatByTaskIdAndCollectionInput
 * @type INPUT_OBJECT
 */
export type UpdateTaskStatByTaskIdAndCollectionInput = {
  clientMutationId?: string | null;
  patch: TaskStatPatch;
  taskId: any;
  collection: string;
};

/**
 * @name TaskStatPatch
 * @type INPUT_OBJECT
 */
export type TaskStatPatch = {
  taskId?: any | null;
  collection?: string | null;
  scheduled?: number | null;
  pending?: number | null;
  running?: number | null;
  failure?: number | null;
  timeout?: number | null;
  success?: number | null;
  locked?: number | null;
  total?: number | null;
};

/**
 * @name UpdateTaskStatPayload
 * @type OBJECT
 */
type t_UpdateTaskStatPayload = FieldsType<
  {
    __typename: t_String<"UpdateTaskStatPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `TaskStat` that was updated by this mutation.
     */
    taskStat?: t_TaskStat | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `TaskStat`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `TaskStat`. May be used by Relay 1.
     */
    taskStatEdge: FieldsTypeArg<
      { orderBy?: TaskStatsOrderBy[] | null },
      t_TaskStatsEdge | null
    >;
  },
  Extension<"UpdateTaskStatPayload">
>;

/**
 * @name UpdateTaskByNodeIdInput
 * @type INPUT_OBJECT
 */
export type UpdateTaskByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
  patch: TaskPatch;
};

/**
 * @name TaskPatch
 * @type INPUT_OBJECT
 */
export type TaskPatch = {
  id?: any | null;
  parentId?: any | null;
  name?: string | null;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  priority?: number | null;
  locked?: boolean | null;
  status?: string | null;
  attempts?: number | null;
};

/**
 * @name UpdateTaskPayload
 * @type OBJECT
 */
type t_UpdateTaskPayload = FieldsType<
  {
    __typename: t_String<"UpdateTaskPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Task` that was updated by this mutation.
     */
    task?: t_Task | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Task`.
     */
    parent?: t_Task | null;

    /**
     * An edge for our `Task`. May be used by Relay 1.
     */
    taskEdge: FieldsTypeArg<
      { orderBy?: TasksOrderBy[] | null },
      t_TasksEdge | null
    >;
  },
  Extension<"UpdateTaskPayload">
>;

/**
 * @name UpdateTaskInput
 * @type INPUT_OBJECT
 */
export type UpdateTaskInput = {
  clientMutationId?: string | null;
  patch: TaskPatch;
  id: any;
};

/**
 * @name UpdateTaskByNameAndParamsAndContextAndExecuteAtInput
 * @type INPUT_OBJECT
 */
export type UpdateTaskByNameAndParamsAndContextAndExecuteAtInput = {
  clientMutationId?: string | null;
  patch: TaskPatch;
  name: string;
  params: { [K: string]: any };
  context: { [K: string]: any };
  executeAt: any;
};

/**
 * @name DeleteExecutionByNodeIdInput
 * @type INPUT_OBJECT
 */
export type DeleteExecutionByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
};

/**
 * @name DeleteExecutionPayload
 * @type OBJECT
 */
type t_DeleteExecutionPayload = FieldsType<
  {
    __typename: t_String<"DeleteExecutionPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Execution` that was deleted by this mutation.
     */
    execution?: t_Execution | null;
    deletedExecutionNodeId?: t_ID | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Execution`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `Execution`. May be used by Relay 1.
     */
    executionEdge: FieldsTypeArg<
      { orderBy?: ExecutionsOrderBy[] | null },
      t_ExecutionsEdge | null
    >;
  },
  Extension<"DeleteExecutionPayload">
>;

/**
 * @name DeleteExecutionInput
 * @type INPUT_OBJECT
 */
export type DeleteExecutionInput = {
  clientMutationId?: string | null;
  id: any;
};

/**
 * @name DeleteLogByNodeIdInput
 * @type INPUT_OBJECT
 */
export type DeleteLogByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
};

/**
 * @name DeleteLogPayload
 * @type OBJECT
 */
type t_DeleteLogPayload = FieldsType<
  {
    __typename: t_String<"DeleteLogPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Log` that was deleted by this mutation.
     */
    log?: t_Log | null;
    deletedLogNodeId?: t_ID | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Execution` that is related to this `Log`.
     */
    execution?: t_Execution | null;

    /**
     * An edge for our `Log`. May be used by Relay 1.
     */
    logEdge: FieldsTypeArg<
      { orderBy?: LogsOrderBy[] | null },
      t_LogsEdge | null
    >;
  },
  Extension<"DeleteLogPayload">
>;

/**
 * @name DeleteLogInput
 * @type INPUT_OBJECT
 */
export type DeleteLogInput = { clientMutationId?: string | null; id: any };

/**
 * @name DeleteMigrationByNodeIdInput
 * @type INPUT_OBJECT
 */
export type DeleteMigrationByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
};

/**
 * @name DeleteMigrationPayload
 * @type OBJECT
 */
type t_DeleteMigrationPayload = FieldsType<
  {
    __typename: t_String<"DeleteMigrationPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Migration` that was deleted by this mutation.
     */
    migration?: t_Migration | null;
    deletedMigrationNodeId?: t_ID | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * An edge for our `Migration`. May be used by Relay 1.
     */
    migrationEdge: FieldsTypeArg<
      { orderBy?: MigrationsOrderBy[] | null },
      t_MigrationsEdge | null
    >;
  },
  Extension<"DeleteMigrationPayload">
>;

/**
 * @name DeleteMigrationInput
 * @type INPUT_OBJECT
 */
export type DeleteMigrationInput = {
  clientMutationId?: string | null;
  id: number;
};

/**
 * @name DeleteMigrationByNameInput
 * @type INPUT_OBJECT
 */
export type DeleteMigrationByNameInput = {
  clientMutationId?: string | null;
  name: string;
};

/**
 * @name DeleteTaskStatByTaskIdAndCollectionInput
 * @type INPUT_OBJECT
 */
export type DeleteTaskStatByTaskIdAndCollectionInput = {
  clientMutationId?: string | null;
  taskId: any;
  collection: string;
};

/**
 * @name DeleteTaskStatPayload
 * @type OBJECT
 */
type t_DeleteTaskStatPayload = FieldsType<
  {
    __typename: t_String<"DeleteTaskStatPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `TaskStat` that was deleted by this mutation.
     */
    taskStat?: t_TaskStat | null;
    deletedTaskStatNodeId?: t_ID | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `TaskStat`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `TaskStat`. May be used by Relay 1.
     */
    taskStatEdge: FieldsTypeArg<
      { orderBy?: TaskStatsOrderBy[] | null },
      t_TaskStatsEdge | null
    >;
  },
  Extension<"DeleteTaskStatPayload">
>;

/**
 * @name DeleteTaskByNodeIdInput
 * @type INPUT_OBJECT
 */
export type DeleteTaskByNodeIdInput = {
  clientMutationId?: string | null;
  nodeId: string;
};

/**
 * @name DeleteTaskPayload
 * @type OBJECT
 */
type t_DeleteTaskPayload = FieldsType<
  {
    __typename: t_String<"DeleteTaskPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `Task` that was deleted by this mutation.
     */
    task?: t_Task | null;
    deletedTaskNodeId?: t_ID | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Task`.
     */
    parent?: t_Task | null;

    /**
     * An edge for our `Task`. May be used by Relay 1.
     */
    taskEdge: FieldsTypeArg<
      { orderBy?: TasksOrderBy[] | null },
      t_TasksEdge | null
    >;
  },
  Extension<"DeleteTaskPayload">
>;

/**
 * @name DeleteTaskInput
 * @type INPUT_OBJECT
 */
export type DeleteTaskInput = { clientMutationId?: string | null; id: any };

/**
 * @name DeleteTaskByNameAndParamsAndContextAndExecuteAtInput
 * @type INPUT_OBJECT
 */
export type DeleteTaskByNameAndParamsAndContextAndExecuteAtInput = {
  clientMutationId?: string | null;
  name: string;
  params: { [K: string]: any };
  context: { [K: string]: any };
  executeAt: any;
};

/**
 * @name ExecuteTaskInput
 * @type INPUT_OBJECT
 */
export type ExecuteTaskInput = {
  clientMutationId?: string | null;
  taskId?: number | null;
};

/**
 * @name ExecuteTaskPayload
 * @type OBJECT
 */
type t_ExecuteTaskPayload = FieldsType<
  {
    __typename: t_String<"ExecuteTaskPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;
    execution?: t_Execution | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Execution`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `Execution`. May be used by Relay 1.
     */
    executionEdge: FieldsTypeArg<
      { orderBy?: ExecutionsOrderBy[] | null },
      t_ExecutionsEdge | null
    >;
  },
  Extension<"ExecuteTaskPayload">
>;

/**
 * @name IncTaskStatInput
 * @type INPUT_OBJECT
 */
export type IncTaskStatInput = {
  clientMutationId?: string | null;
  taskId?: any | null;
  collection?: string | null;
  colName?: string | null;
  value?: number | null;
};

/**
 * @name IncTaskStatPayload
 * @type OBJECT
 */
type t_IncTaskStatPayload = FieldsType<
  {
    __typename: t_String<"IncTaskStatPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;
  },
  Extension<"IncTaskStatPayload">
>;

/**
 * @name ProcessNextTaskInput
 * @type INPUT_OBJECT
 */
export type ProcessNextTaskInput = {
  clientMutationId?: string | null;
  backoffDecay?: string | null;
  backoffDelay?: IntervalInput | null;
  concurrentExecutions?: number | null;
  maxAttempts?: number | null;
};

/**
 * @name IntervalInput
 * @type INPUT_OBJECT
 */
export type IntervalInput = {
  seconds?: number | null;
  minutes?: number | null;
  hours?: number | null;
  days?: number | null;
  months?: number | null;
  years?: number | null;
};

/**
 * @name Float
 * @type SCALAR
 */
type t_Float<T extends number = number> = ScalarType<T, Extension<"Float">>;

/**
 * @name ProcessNextTaskPayload
 * @type OBJECT
 */
type t_ProcessNextTaskPayload = FieldsType<
  {
    __typename: t_String<"ProcessNextTaskPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;
    results?: (t_ProcessNextTaskRecord | null)[] | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;
  },
  Extension<"ProcessNextTaskPayload">
>;

/**
 * @name ProcessNextTaskRecord
 * @type OBJECT
 */
type t_ProcessNextTaskRecord = FieldsType<
  {
    __typename: t_String<"ProcessNextTaskRecord">;
    executionId?: t_BigInt | null;
    taskName?: t_String | null;
  },
  Extension<"ProcessNextTaskRecord">
>;

/**
 * @name UpdateExecutionStatusInput
 * @type INPUT_OBJECT
 */
export type UpdateExecutionStatusInput = {
  clientMutationId?: string | null;
  newStatus?: string | null;
  executionId?: any | null;
  taskId?: any | null;
  maxAttempts?: number | null;
};

/**
 * @name UpdateExecutionStatusPayload
 * @type OBJECT
 */
type t_UpdateExecutionStatusPayload = FieldsType<
  {
    __typename: t_String<"UpdateExecutionStatusPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;
    execution?: t_Execution | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * Reads a single `Task` that is related to this `Execution`.
     */
    task?: t_Task | null;

    /**
     * An edge for our `Execution`. May be used by Relay 1.
     */
    executionEdge: FieldsTypeArg<
      { orderBy?: ExecutionsOrderBy[] | null },
      t_ExecutionsEdge | null
    >;
  },
  Extension<"UpdateExecutionStatusPayload">
>;

/**
 * @name UpdateStatsInput
 * @type INPUT_OBJECT
 */
export type UpdateStatsInput = {
  clientMutationId?: string | null;
  op?: string | null;
  arg?: string | null;
  old?: TaskInput | null;
  new?: TaskInput | null;
  collection?: string | null;
  recurse?: boolean | null;
};

/**
 * @name UpdateStatsPayload
 * @type OBJECT
 */
type t_UpdateStatsPayload = FieldsType<
  {
    __typename: t_String<"UpdateStatsPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;
  },
  Extension<"UpdateStatsPayload">
>;

/**
 * @name __Schema
 * @type OBJECT
 */
type t___Schema = FieldsType<
  {
    __typename: t_String<"__Schema">;

    /**
     * A list of all types supported by this server.
     */
    types: t___Type[];

    /**
     * The type that query operations will be rooted at.
     */
    queryType: t___Type;

    /**
     * If this server supports mutation, the type that mutation operations will be rooted at.
     */
    mutationType?: t___Type | null;

    /**
     * If this server support subscription, the type that subscription operations will be rooted at.
     */
    subscriptionType?: t___Type | null;

    /**
     * A list of all directives supported by this server.
     */
    directives: t___Directive[];
  },
  Extension<"__Schema">
>;

/**
 * @name __Type
 * @type OBJECT
 */
type t___Type = FieldsType<
  {
    __typename: t_String<"__Type">;
    kind: t___TypeKind;
    name?: t_String | null;
    description?: t_String | null;
    fields: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    interfaces?: t___Type[] | null;
    possibleTypes?: t___Type[] | null;
    enumValues: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___EnumValue[] | null
    >;
    inputFields?: t___InputValue[] | null;
    ofType?: t___Type | null;
  },
  Extension<"__Type">
>;

/**
 * @name __TypeKind
 * @type ENUM
 */
type t___TypeKind = EnumType<
  | "SCALAR"
  | "OBJECT"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "INPUT_OBJECT"
  | "LIST"
  | "NON_NULL"
>;

/**
 * @name __Field
 * @type OBJECT
 */
type t___Field = FieldsType<
  {
    __typename: t_String<"__Field">;
    name: t_String;
    description?: t_String | null;
    args: t___InputValue[];
    type: t___Type;
    isDeprecated: t_Boolean;
    deprecationReason?: t_String | null;
  },
  Extension<"__Field">
>;

/**
 * @name __InputValue
 * @type OBJECT
 */
type t___InputValue = FieldsType<
  {
    __typename: t_String<"__InputValue">;
    name: t_String;
    description?: t_String | null;
    type: t___Type;

    /**
     * A GraphQL-formatted string representing the default value for this input value.
     */
    defaultValue?: t_String | null;
  },
  Extension<"__InputValue">
>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
type t___EnumValue = FieldsType<
  {
    __typename: t_String<"__EnumValue">;
    name: t_String;
    description?: t_String | null;
    isDeprecated: t_Boolean;
    deprecationReason?: t_String | null;
  },
  Extension<"__EnumValue">
>;

/**
 * @name __Directive
 * @type OBJECT
 */
type t___Directive = FieldsType<
  {
    __typename: t_String<"__Directive">;
    name: t_String;
    description?: t_String | null;
    locations: t___DirectiveLocation[];
    args: t___InputValue[];
  },
  Extension<"__Directive">
>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
type t___DirectiveLocation = EnumType<
  | "QUERY"
  | "MUTATION"
  | "SUBSCRIPTION"
  | "FIELD"
  | "FRAGMENT_DEFINITION"
  | "FRAGMENT_SPREAD"
  | "INLINE_FRAGMENT"
  | "VARIABLE_DEFINITION"
  | "SCHEMA"
  | "SCALAR"
  | "OBJECT"
  | "FIELD_DEFINITION"
  | "ARGUMENT_DEFINITION"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "ENUM_VALUE"
  | "INPUT_OBJECT"
  | "INPUT_FIELD_DEFINITION"
>;

/**
 * @name Query
 * @type OBJECT
 * @implements Node
 */
export type Query = TypeData<t_Query>;

/**
 * @name Node
 * @type INTERFACE
 */
export type Node = TypeData<t_Node>;

/**
 * @name ID
 * @type SCALAR
 */
export type ID = TypeData<t_ID>;

/**
 * @name Int
 * @type SCALAR
 */
export type Int = TypeData<t_Int>;

/**
 * @name Cursor
 * @type SCALAR
 */
export type Cursor = TypeData<t_Cursor>;

/**
 * @name ExecutionsOrderBy
 * @type ENUM
 */
export enum ExecutionsOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  TASK_ID_ASC = "TASK_ID_ASC",
  TASK_ID_DESC = "TASK_ID_DESC",
  STATUS_ASC = "STATUS_ASC",
  STATUS_DESC = "STATUS_DESC",
  STARTED_AT_ASC = "STARTED_AT_ASC",
  STARTED_AT_DESC = "STARTED_AT_DESC",
  FINISHED_AT_ASC = "FINISHED_AT_ASC",
  FINISHED_AT_DESC = "FINISHED_AT_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}

/**
 * @name BigInt
 * @type SCALAR
 */
export type BigInt = TypeData<t_BigInt>;

/**
 * @name String
 * @type SCALAR
 */
export type String = TypeData<t_String>;

/**
 * @name Datetime
 * @type SCALAR
 */
export type Datetime = TypeData<t_Datetime>;

/**
 * @name ExecutionsConnection
 * @type OBJECT
 */
export type ExecutionsConnection = TypeData<t_ExecutionsConnection>;

/**
 * @name Execution
 * @type OBJECT
 * @implements Node
 */
export type Execution = TypeData<t_Execution>;

/**
 * @name Task
 * @type OBJECT
 * @implements Node
 */
export type Task = TypeData<t_Task>;

/**
 * @name JSON
 * @type SCALAR
 */
export type JSON = TypeData<t_JSON>;

/**
 * @name Boolean
 * @type SCALAR
 */
export type Boolean = TypeData<t_Boolean>;

/**
 * @name TasksOrderBy
 * @type ENUM
 */
export enum TasksOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  PARENT_ID_ASC = "PARENT_ID_ASC",
  PARENT_ID_DESC = "PARENT_ID_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  PARAMS_ASC = "PARAMS_ASC",
  PARAMS_DESC = "PARAMS_DESC",
  CONTEXT_ASC = "CONTEXT_ASC",
  CONTEXT_DESC = "CONTEXT_DESC",
  EXECUTE_AT_ASC = "EXECUTE_AT_ASC",
  EXECUTE_AT_DESC = "EXECUTE_AT_DESC",
  PRIORITY_ASC = "PRIORITY_ASC",
  PRIORITY_DESC = "PRIORITY_DESC",
  LOCKED_ASC = "LOCKED_ASC",
  LOCKED_DESC = "LOCKED_DESC",
  STATUS_ASC = "STATUS_ASC",
  STATUS_DESC = "STATUS_DESC",
  ATTEMPTS_ASC = "ATTEMPTS_ASC",
  ATTEMPTS_DESC = "ATTEMPTS_DESC",
  LAST_EXECUTED_ASC = "LAST_EXECUTED_ASC",
  LAST_EXECUTED_DESC = "LAST_EXECUTED_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}

/**
 * @name TasksConnection
 * @type OBJECT
 */
export type TasksConnection = TypeData<t_TasksConnection>;

/**
 * @name TasksEdge
 * @type OBJECT
 */
export type TasksEdge = TypeData<t_TasksEdge>;

/**
 * @name PageInfo
 * @type OBJECT
 */
export type PageInfo = TypeData<t_PageInfo>;

/**
 * @name TaskStatsOrderBy
 * @type ENUM
 */
export enum TaskStatsOrderBy {
  NATURAL = "NATURAL",
  TASK_ID_ASC = "TASK_ID_ASC",
  TASK_ID_DESC = "TASK_ID_DESC",
  COLLECTION_ASC = "COLLECTION_ASC",
  COLLECTION_DESC = "COLLECTION_DESC",
  SCHEDULED_ASC = "SCHEDULED_ASC",
  SCHEDULED_DESC = "SCHEDULED_DESC",
  PENDING_ASC = "PENDING_ASC",
  PENDING_DESC = "PENDING_DESC",
  RUNNING_ASC = "RUNNING_ASC",
  RUNNING_DESC = "RUNNING_DESC",
  FAILURE_ASC = "FAILURE_ASC",
  FAILURE_DESC = "FAILURE_DESC",
  TIMEOUT_ASC = "TIMEOUT_ASC",
  TIMEOUT_DESC = "TIMEOUT_DESC",
  SUCCESS_ASC = "SUCCESS_ASC",
  SUCCESS_DESC = "SUCCESS_DESC",
  LOCKED_ASC = "LOCKED_ASC",
  LOCKED_DESC = "LOCKED_DESC",
  TOTAL_ASC = "TOTAL_ASC",
  TOTAL_DESC = "TOTAL_DESC",
}

/**
 * @name TaskStatsConnection
 * @type OBJECT
 */
export type TaskStatsConnection = TypeData<t_TaskStatsConnection>;

/**
 * @name TaskStat
 * @type OBJECT
 */
export type TaskStat = TypeData<t_TaskStat>;

/**
 * @name TaskStatsEdge
 * @type OBJECT
 */
export type TaskStatsEdge = TypeData<t_TaskStatsEdge>;

/**
 * @name LogsOrderBy
 * @type ENUM
 */
export enum LogsOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  EXECUTION_ID_ASC = "EXECUTION_ID_ASC",
  EXECUTION_ID_DESC = "EXECUTION_ID_DESC",
  TIME_ASC = "TIME_ASC",
  TIME_DESC = "TIME_DESC",
  MESSAGE_ASC = "MESSAGE_ASC",
  MESSAGE_DESC = "MESSAGE_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}

/**
 * @name LogsConnection
 * @type OBJECT
 */
export type LogsConnection = TypeData<t_LogsConnection>;

/**
 * @name Log
 * @type OBJECT
 * @implements Node
 */
export type Log = TypeData<t_Log>;

/**
 * @name LogsEdge
 * @type OBJECT
 */
export type LogsEdge = TypeData<t_LogsEdge>;

/**
 * @name ExecutionsEdge
 * @type OBJECT
 */
export type ExecutionsEdge = TypeData<t_ExecutionsEdge>;

/**
 * @name MigrationsOrderBy
 * @type ENUM
 */
export enum MigrationsOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  HASH_ASC = "HASH_ASC",
  HASH_DESC = "HASH_DESC",
  EXECUTED_AT_ASC = "EXECUTED_AT_ASC",
  EXECUTED_AT_DESC = "EXECUTED_AT_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}

/**
 * @name MigrationsConnection
 * @type OBJECT
 */
export type MigrationsConnection = TypeData<t_MigrationsConnection>;

/**
 * @name Migration
 * @type OBJECT
 * @implements Node
 */
export type Migration = TypeData<t_Migration>;

/**
 * @name MigrationsEdge
 * @type OBJECT
 */
export type MigrationsEdge = TypeData<t_MigrationsEdge>;

/**
 * @name Mutation
 * @type OBJECT
 */
export type Mutation = TypeData<t_Mutation>;

/**
 * @name CreateExecutionPayload
 * @type OBJECT
 */
export type CreateExecutionPayload = TypeData<t_CreateExecutionPayload>;

/**
 * @name CreateLogPayload
 * @type OBJECT
 */
export type CreateLogPayload = TypeData<t_CreateLogPayload>;

/**
 * @name CreateMigrationPayload
 * @type OBJECT
 */
export type CreateMigrationPayload = TypeData<t_CreateMigrationPayload>;

/**
 * @name CreateTaskStatPayload
 * @type OBJECT
 */
export type CreateTaskStatPayload = TypeData<t_CreateTaskStatPayload>;

/**
 * @name CreateTaskPayload
 * @type OBJECT
 */
export type CreateTaskPayload = TypeData<t_CreateTaskPayload>;

/**
 * @name UpdateExecutionPayload
 * @type OBJECT
 */
export type UpdateExecutionPayload = TypeData<t_UpdateExecutionPayload>;

/**
 * @name UpdateLogPayload
 * @type OBJECT
 */
export type UpdateLogPayload = TypeData<t_UpdateLogPayload>;

/**
 * @name UpdateMigrationPayload
 * @type OBJECT
 */
export type UpdateMigrationPayload = TypeData<t_UpdateMigrationPayload>;

/**
 * @name UpdateTaskStatPayload
 * @type OBJECT
 */
export type UpdateTaskStatPayload = TypeData<t_UpdateTaskStatPayload>;

/**
 * @name UpdateTaskPayload
 * @type OBJECT
 */
export type UpdateTaskPayload = TypeData<t_UpdateTaskPayload>;

/**
 * @name DeleteExecutionPayload
 * @type OBJECT
 */
export type DeleteExecutionPayload = TypeData<t_DeleteExecutionPayload>;

/**
 * @name DeleteLogPayload
 * @type OBJECT
 */
export type DeleteLogPayload = TypeData<t_DeleteLogPayload>;

/**
 * @name DeleteMigrationPayload
 * @type OBJECT
 */
export type DeleteMigrationPayload = TypeData<t_DeleteMigrationPayload>;

/**
 * @name DeleteTaskStatPayload
 * @type OBJECT
 */
export type DeleteTaskStatPayload = TypeData<t_DeleteTaskStatPayload>;

/**
 * @name DeleteTaskPayload
 * @type OBJECT
 */
export type DeleteTaskPayload = TypeData<t_DeleteTaskPayload>;

/**
 * @name ExecuteTaskPayload
 * @type OBJECT
 */
export type ExecuteTaskPayload = TypeData<t_ExecuteTaskPayload>;

/**
 * @name IncTaskStatPayload
 * @type OBJECT
 */
export type IncTaskStatPayload = TypeData<t_IncTaskStatPayload>;

/**
 * @name Float
 * @type SCALAR
 */
export type Float = TypeData<t_Float>;

/**
 * @name ProcessNextTaskPayload
 * @type OBJECT
 */
export type ProcessNextTaskPayload = TypeData<t_ProcessNextTaskPayload>;

/**
 * @name ProcessNextTaskRecord
 * @type OBJECT
 */
export type ProcessNextTaskRecord = TypeData<t_ProcessNextTaskRecord>;

/**
 * @name UpdateExecutionStatusPayload
 * @type OBJECT
 */
export type UpdateExecutionStatusPayload = TypeData<
  t_UpdateExecutionStatusPayload
>;

/**
 * @name UpdateStatsPayload
 * @type OBJECT
 */
export type UpdateStatsPayload = TypeData<t_UpdateStatsPayload>;

/**
 * @name __Schema
 * @type OBJECT
 */
export type __Schema = TypeData<t___Schema>;

/**
 * @name __Type
 * @type OBJECT
 */
export type __Type = TypeData<t___Type>;

/**
 * @name __TypeKind
 * @type ENUM
 */
export enum __TypeKind {
  SCALAR = "SCALAR",
  OBJECT = "OBJECT",
  INTERFACE = "INTERFACE",
  UNION = "UNION",
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  LIST = "LIST",
  NON_NULL = "NON_NULL",
}

/**
 * @name __Field
 * @type OBJECT
 */
export type __Field = TypeData<t___Field>;

/**
 * @name __InputValue
 * @type OBJECT
 */
export type __InputValue = TypeData<t___InputValue>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
export type __EnumValue = TypeData<t___EnumValue>;

/**
 * @name __Directive
 * @type OBJECT
 */
export type __Directive = TypeData<t___Directive>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
export enum __DirectiveLocation {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
  SUBSCRIPTION = "SUBSCRIPTION",
  FIELD = "FIELD",
  FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD = "FRAGMENT_SPREAD",
  INLINE_FRAGMENT = "INLINE_FRAGMENT",
  VARIABLE_DEFINITION = "VARIABLE_DEFINITION",
  SCHEMA = "SCHEMA",
  SCALAR = "SCALAR",
  OBJECT = "OBJECT",
  FIELD_DEFINITION = "FIELD_DEFINITION",
  ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION",
  INTERFACE = "INTERFACE",
  UNION = "UNION",
  ENUM = "ENUM",
  ENUM_VALUE = "ENUM_VALUE",
  INPUT_OBJECT = "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION",
}
