import * as extensions from "../extensions";
import {
  TypeData,
  FieldsType,
  FieldsTypeArg,
  ScalarType,
  EnumType
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
     * Reads and enables pagination through a set of `ExtendedTask`.
     */
    extendedTasksConnection: FieldsTypeArg<
      {
        first?: number | null;
        last?: number | null;
        offset?: number | null;
        before?: any | null;
        after?: any | null;
        orderBy?: ExtendedTasksOrderBy[] | null;
        condition?: ExtendedTaskCondition | null;
      },
      t_ExtendedTasksConnection | null
    >;

    /**
     * Reads a set of `ExtendedTask`.
     */
    extendedTasks: FieldsTypeArg<
      {
        first?: number | null;
        offset?: number | null;
        orderBy?: ExtendedTasksOrderBy[] | null;
        condition?: ExtendedTaskCondition | null;
      },
      t_ExtendedTask[] | null
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
    execution: FieldsTypeArg<{ id: number }, t_Execution | null>;
    log: FieldsTypeArg<{ id: number }, t_Log | null>;
    migration: FieldsTypeArg<{ id: number }, t_Migration | null>;
    migrationByName: FieldsTypeArg<{ name: string }, t_Migration | null>;
    task: FieldsTypeArg<{ id: number }, t_Task | null>;
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
    descendantTasksConnectio: FieldsTypeArg<
      {
        taskId?: number | null;
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
      { taskId?: number | null; first?: number | null; offset?: number | null },
      (t_Task | null)[] | null
    >;
    descendantTasksCounts: FieldsTypeArg<
      { taskId?: number | null },
      t_Count | null
    >;

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
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC"
>;

/**
 * @name ExecutionCondition
 * @type INPUT_OBJECT
 */
export type ExecutionCondition = {
  id?: number | null;
  taskId?: number | null;
  status?: string | null;
  startedAt?: any | null;
};

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
    id: t_Int;
    taskId: t_Int;
    status: t_String;
    startedAt?: t_Datetime | null;

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
    id: t_Int;
    parentId?: t_Int | null;
    name: t_String;
    params?: t_JSON | null;
    context?: t_JSON | null;
    executeAt: t_Datetime;
    locked: t_Boolean;

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
    attempts?: t_Int | null;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    childrenConnection: FieldsTypeArg<
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
    children?: FieldsTypeArg<
      { first?: number | null; offset?: number | null },
      (t_Task | null)[] | null
    >;
    descendantCounts?: t_Count | null;

    /**
     * Reads and enables pagination through a set of `Task`.
     */
    descendantsConnection: FieldsTypeArg<
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
    descendants?: FieldsTypeArg<
      { first?: number | null; offset?: number | null },
      (t_Task | null)[] | null
    >;
    lastExecuted?: t_Datetime | null;
    status?: t_String | null;
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
 * @name Count
 * @type OBJECT
 */
type t_Count = FieldsType<
  {
    __typename: t_String<"Count">;
    running?: t_BigInt | null;
    success?: t_BigInt | null;
    failure?: t_BigInt | null;
    pending?: t_BigInt | null;
    timeout?: t_BigInt | null;
    scheduled?: t_BigInt | null;
    total?: t_BigInt | null;
  },
  Extension<"Count">
>;

/**
 * @name BigInt
 * @type SCALAR
 */
type t_BigInt<T extends any = any> = ScalarType<T, Extension<"BigInt">>;

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
  id?: number | null;
  executionId?: number | null;
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
    id: t_Int;
    executionId: t_Int;
    time?: t_Datetime | null;
    message?: t_JSON | null;

    /**
     * Reads a single `Execution` that is related to this `Log`.
     */
    execution?: t_Execution | null;
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
 * @name ExtendedTasksOrderBy
 * @type ENUM
 */
type t_ExtendedTasksOrderBy = EnumType<
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
  | "LOCKED_ASC"
  | "LOCKED_DESC"
  | "STATUS_ASC"
  | "STATUS_DESC"
  | "LAST_EXECUTED_ASC"
  | "LAST_EXECUTED_DESC"
  | "ATTEMPTS_ASC"
  | "ATTEMPTS_DESC"
>;

/**
 * @name ExtendedTaskCondition
 * @type INPUT_OBJECT
 */
export type ExtendedTaskCondition = {
  id?: number | null;
  parentId?: number | null;
  name?: string | null;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  locked?: boolean | null;
  status?: string | null;
  lastExecuted?: any | null;
  attempts?: number | null;
};

/**
 * @name ExtendedTasksConnection
 * @type OBJECT
 */
type t_ExtendedTasksConnection = FieldsType<
  {
    __typename: t_String<"ExtendedTasksConnection">;

    /**
     * A list of `ExtendedTask` objects.
     */
    nodes: (t_ExtendedTask | null)[];

    /**
     * A list of edges which contains the `ExtendedTask` and cursor to aid in pagination.
     */
    edges: t_ExtendedTasksEdge[];

    /**
     * Information to aid in pagination.
     */
    pageInfo: t_PageInfo;

    /**
     * The count of *all* `ExtendedTask` you could get from the connection.
     */
    totalCount: t_Int;
  },
  Extension<"ExtendedTasksConnection">
>;

/**
 * @name ExtendedTask
 * @type OBJECT
 */
type t_ExtendedTask = FieldsType<
  {
    __typename: t_String<"ExtendedTask">;
    id: t_Int;
    parentId?: t_Int | null;
    name: t_String;
    params?: t_JSON | null;
    context?: t_JSON | null;
    executeAt: t_Datetime;
    locked: t_Boolean;
    status: t_String;
    lastExecuted?: t_Datetime | null;
    attempts: t_Int;
  },
  Extension<"ExtendedTask">
>;

/**
 * @name ExtendedTasksEdge
 * @type OBJECT
 */
type t_ExtendedTasksEdge = FieldsType<
  {
    __typename: t_String<"ExtendedTasksEdge">;

    /**
     * A cursor for use in pagination.
     */
    cursor?: t_Cursor | null;

    /**
     * The `ExtendedTask` at the end of the edge.
     */
    node?: t_ExtendedTask | null;
  },
  Extension<"ExtendedTasksEdge">
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
  | "LOCKED_ASC"
  | "LOCKED_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC"
>;

/**
 * @name TaskCondition
 * @type INPUT_OBJECT
 */
export type TaskCondition = {
  id?: number | null;
  parentId?: number | null;
  name?: string | null;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  locked?: boolean | null;
};

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
    createExecution?: FieldsTypeArg<
      { input: CreateExecutionInput },
      t_CreateExecutionPayload | null
    >;

    /**
     * Creates a single `ExtendedTask`.
     */
    createExtendedTask?: FieldsTypeArg<
      { input: CreateExtendedTaskInput },
      t_CreateExtendedTaskPayload | null
    >;

    /**
     * Creates a single `Log`.
     */
    createLog?: FieldsTypeArg<
      { input: CreateLogInput },
      t_CreateLogPayload | null
    >;

    /**
     * Creates a single `Migration`.
     */
    createMigration?: FieldsTypeArg<
      { input: CreateMigrationInput },
      t_CreateMigrationPayload | null
    >;

    /**
     * Creates a single `Task`.
     */
    createTask?: FieldsTypeArg<
      { input: CreateTaskInput },
      t_CreateTaskPayload | null
    >;

    /**
     * Updates a single `Execution` using its globally unique id and a patch.
     */
    updateExecutionByNodeId?: FieldsTypeArg<
      { input: UpdateExecutionByNodeIdInput },
      t_UpdateExecutionPayload | null
    >;

    /**
     * Updates a single `Execution` using a unique key and a patch.
     */
    updateExecution?: FieldsTypeArg<
      { input: UpdateExecutionInput },
      t_UpdateExecutionPayload | null
    >;

    /**
     * Updates a single `Log` using its globally unique id and a patch.
     */
    updateLogByNodeId?: FieldsTypeArg<
      { input: UpdateLogByNodeIdInput },
      t_UpdateLogPayload | null
    >;

    /**
     * Updates a single `Log` using a unique key and a patch.
     */
    updateLog?: FieldsTypeArg<
      { input: UpdateLogInput },
      t_UpdateLogPayload | null
    >;

    /**
     * Updates a single `Migration` using its globally unique id and a patch.
     */
    updateMigrationByNodeId?: FieldsTypeArg<
      { input: UpdateMigrationByNodeIdInput },
      t_UpdateMigrationPayload | null
    >;

    /**
     * Updates a single `Migration` using a unique key and a patch.
     */
    updateMigration?: FieldsTypeArg<
      { input: UpdateMigrationInput },
      t_UpdateMigrationPayload | null
    >;

    /**
     * Updates a single `Migration` using a unique key and a patch.
     */
    updateMigrationByName?: FieldsTypeArg<
      { input: UpdateMigrationByNameInput },
      t_UpdateMigrationPayload | null
    >;

    /**
     * Updates a single `Task` using its globally unique id and a patch.
     */
    updateTaskByNodeId?: FieldsTypeArg<
      { input: UpdateTaskByNodeIdInput },
      t_UpdateTaskPayload | null
    >;

    /**
     * Updates a single `Task` using a unique key and a patch.
     */
    updateTask?: FieldsTypeArg<
      { input: UpdateTaskInput },
      t_UpdateTaskPayload | null
    >;

    /**
     * Updates a single `Task` using a unique key and a patch.
     */
    updateTaskByNameAndParamsAndContextAndExecuteAt?: FieldsTypeArg<
      { input: UpdateTaskByNameAndParamsAndContextAndExecuteAtInput },
      t_UpdateTaskPayload | null
    >;

    /**
     * Deletes a single `Execution` using its globally unique id.
     */
    deleteExecutionByNodeId?: FieldsTypeArg<
      { input: DeleteExecutionByNodeIdInput },
      t_DeleteExecutionPayload | null
    >;

    /**
     * Deletes a single `Execution` using a unique key.
     */
    deleteExecution?: FieldsTypeArg<
      { input: DeleteExecutionInput },
      t_DeleteExecutionPayload | null
    >;

    /**
     * Deletes a single `Log` using its globally unique id.
     */
    deleteLogByNodeId?: FieldsTypeArg<
      { input: DeleteLogByNodeIdInput },
      t_DeleteLogPayload | null
    >;

    /**
     * Deletes a single `Log` using a unique key.
     */
    deleteLog?: FieldsTypeArg<
      { input: DeleteLogInput },
      t_DeleteLogPayload | null
    >;

    /**
     * Deletes a single `Migration` using its globally unique id.
     */
    deleteMigrationByNodeId?: FieldsTypeArg<
      { input: DeleteMigrationByNodeIdInput },
      t_DeleteMigrationPayload | null
    >;

    /**
     * Deletes a single `Migration` using a unique key.
     */
    deleteMigration?: FieldsTypeArg<
      { input: DeleteMigrationInput },
      t_DeleteMigrationPayload | null
    >;

    /**
     * Deletes a single `Migration` using a unique key.
     */
    deleteMigrationByName?: FieldsTypeArg<
      { input: DeleteMigrationByNameInput },
      t_DeleteMigrationPayload | null
    >;

    /**
     * Deletes a single `Task` using its globally unique id.
     */
    deleteTaskByNodeId?: FieldsTypeArg<
      { input: DeleteTaskByNodeIdInput },
      t_DeleteTaskPayload | null
    >;

    /**
     * Deletes a single `Task` using a unique key.
     */
    deleteTask?: FieldsTypeArg<
      { input: DeleteTaskInput },
      t_DeleteTaskPayload | null
    >;

    /**
     * Deletes a single `Task` using a unique key.
     */
    deleteTaskByNameAndParamsAndContextAndExecuteAt?: FieldsTypeArg<
      { input: DeleteTaskByNameAndParamsAndContextAndExecuteAtInput },
      t_DeleteTaskPayload | null
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
  id?: number | null;
  taskId: number;
  status?: string | null;
  startedAt?: any | null;
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
    executionEdge?: FieldsTypeArg<
      { orderBy?: ExecutionsOrderBy[] | null },
      t_ExecutionsEdge | null
    >;
  },
  Extension<"CreateExecutionPayload">
>;

/**
 * @name CreateExtendedTaskInput
 * @type INPUT_OBJECT
 */
export type CreateExtendedTaskInput = {
  clientMutationId?: string | null;
  extendedTask: ExtendedTaskInput;
};

/**
 * @name ExtendedTaskInput
 * @type INPUT_OBJECT
 */
export type ExtendedTaskInput = {
  id?: number | null;
  parentId?: number | null;
  name?: string | null;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  locked?: boolean | null;
  status?: string | null;
  lastExecuted?: any | null;
  attempts?: number | null;
};

/**
 * @name CreateExtendedTaskPayload
 * @type OBJECT
 */
type t_CreateExtendedTaskPayload = FieldsType<
  {
    __typename: t_String<"CreateExtendedTaskPayload">;

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: t_String | null;

    /**
     * The `ExtendedTask` that was created by this mutation.
     */
    extendedTask?: t_ExtendedTask | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query?: t_Query | null;

    /**
     * An edge for our `ExtendedTask`. May be used by Relay 1.
     */
    extendedTaskEdge?: FieldsTypeArg<
      { orderBy?: ExtendedTasksOrderBy[] | null },
      t_ExtendedTasksEdge | null
    >;
  },
  Extension<"CreateExtendedTaskPayload">
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
  id?: number | null;
  executionId: number;
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
    logEdge?: FieldsTypeArg<
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
    migrationEdge?: FieldsTypeArg<
      { orderBy?: MigrationsOrderBy[] | null },
      t_MigrationsEdge | null
    >;
  },
  Extension<"CreateMigrationPayload">
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
  id?: number | null;
  parentId?: number | null;
  name: string;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  locked?: boolean | null;
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
     * An edge for our `Task`. May be used by Relay 1.
     */
    taskEdge?: FieldsTypeArg<
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
  id?: number | null;
  taskId?: number | null;
  status?: string | null;
  startedAt?: any | null;
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
    executionEdge?: FieldsTypeArg<
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
  id: number;
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
  id?: number | null;
  executionId?: number | null;
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
    logEdge?: FieldsTypeArg<
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
  id: number;
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
    migrationEdge?: FieldsTypeArg<
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
  id?: number | null;
  parentId?: number | null;
  name?: string | null;
  params?: { [K: string]: any } | null;
  context?: { [K: string]: any } | null;
  executeAt?: any | null;
  locked?: boolean | null;
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
     * An edge for our `Task`. May be used by Relay 1.
     */
    taskEdge?: FieldsTypeArg<
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
  id: number;
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
    executionEdge?: FieldsTypeArg<
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
  id: number;
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
    logEdge?: FieldsTypeArg<
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
export type DeleteLogInput = { clientMutationId?: string | null; id: number };

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
    migrationEdge?: FieldsTypeArg<
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
     * An edge for our `Task`. May be used by Relay 1.
     */
    taskEdge?: FieldsTypeArg<
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
export type DeleteTaskInput = { clientMutationId?: string | null; id: number };

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
    fields?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    interfaces?: t___Type[] | null;
    possibleTypes?: t___Type[] | null;
    enumValues?: FieldsTypeArg<
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
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC"
}

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
 * @name Count
 * @type OBJECT
 */
export type Count = TypeData<t_Count>;

/**
 * @name BigInt
 * @type SCALAR
 */
export type BigInt = TypeData<t_BigInt>;

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
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC"
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
 * @name ExtendedTasksOrderBy
 * @type ENUM
 */
export enum ExtendedTasksOrderBy {
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
  LOCKED_ASC = "LOCKED_ASC",
  LOCKED_DESC = "LOCKED_DESC",
  STATUS_ASC = "STATUS_ASC",
  STATUS_DESC = "STATUS_DESC",
  LAST_EXECUTED_ASC = "LAST_EXECUTED_ASC",
  LAST_EXECUTED_DESC = "LAST_EXECUTED_DESC",
  ATTEMPTS_ASC = "ATTEMPTS_ASC",
  ATTEMPTS_DESC = "ATTEMPTS_DESC"
}

/**
 * @name ExtendedTasksConnection
 * @type OBJECT
 */
export type ExtendedTasksConnection = TypeData<t_ExtendedTasksConnection>;

/**
 * @name ExtendedTask
 * @type OBJECT
 */
export type ExtendedTask = TypeData<t_ExtendedTask>;

/**
 * @name ExtendedTasksEdge
 * @type OBJECT
 */
export type ExtendedTasksEdge = TypeData<t_ExtendedTasksEdge>;

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
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC"
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
  LOCKED_ASC = "LOCKED_ASC",
  LOCKED_DESC = "LOCKED_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC"
}

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
 * @name CreateExtendedTaskPayload
 * @type OBJECT
 */
export type CreateExtendedTaskPayload = TypeData<t_CreateExtendedTaskPayload>;

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
 * @name DeleteTaskPayload
 * @type OBJECT
 */
export type DeleteTaskPayload = TypeData<t_DeleteTaskPayload>;

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
  NON_NULL = "NON_NULL"
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
  INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION"
}
