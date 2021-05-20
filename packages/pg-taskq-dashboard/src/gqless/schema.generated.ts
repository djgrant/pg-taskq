/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** A signed eight-byte integer. The upper big integer values are greater than the max value for a JavaScript number. Therefore all big integers will be output as strings and not numbers. */
  BigInt: any;
  /** A point in time as described by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone. */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
}

/** All input for the create `Execution` mutation. */
export interface CreateExecutionInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `Execution` to be created by this mutation. */
  execution: ExecutionInput;
}

/** All input for the create `Log` mutation. */
export interface CreateLogInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `Log` to be created by this mutation. */
  log: LogInput;
}

/** All input for the create `Migration` mutation. */
export interface CreateMigrationInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `Migration` to be created by this mutation. */
  migration: MigrationInput;
}

/** All input for the create `Task` mutation. */
export interface CreateTaskInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `Task` to be created by this mutation. */
  task: TaskInput;
}

/** All input for the create `TaskStat` mutation. */
export interface CreateTaskStatInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `TaskStat` to be created by this mutation. */
  taskStat: TaskStatInput;
}

/** All input for the `deleteExecutionByNodeId` mutation. */
export interface DeleteExecutionByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Execution` to be deleted. */
  nodeId: Scalars["ID"];
}

/** All input for the `deleteExecution` mutation. */
export interface DeleteExecutionInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  id: Scalars["BigInt"];
}

/** All input for the `deleteLogByNodeId` mutation. */
export interface DeleteLogByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Log` to be deleted. */
  nodeId: Scalars["ID"];
}

/** All input for the `deleteLog` mutation. */
export interface DeleteLogInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  id: Scalars["BigInt"];
}

/** All input for the `deleteMigrationByName` mutation. */
export interface DeleteMigrationByNameInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
}

/** All input for the `deleteMigrationByNodeId` mutation. */
export interface DeleteMigrationByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Migration` to be deleted. */
  nodeId: Scalars["ID"];
}

/** All input for the `deleteMigration` mutation. */
export interface DeleteMigrationInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
}

/** All input for the `deleteTaskByNodeId` mutation. */
export interface DeleteTaskByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Task` to be deleted. */
  nodeId: Scalars["ID"];
}

/** All input for the `deleteTask` mutation. */
export interface DeleteTaskInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  id: Scalars["BigInt"];
}

/** All input for the `deleteTaskStatByTaskIdAndCollection` mutation. */
export interface DeleteTaskStatByTaskIdAndCollectionInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  taskId: Scalars["BigInt"];
  collection: Scalars["String"];
}

/** All input for the `executeTask` mutation. */
export interface ExecuteTaskInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  taskId?: Maybe<Scalars["BigInt"]>;
}

/**
 * A condition to be used against `Execution` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export interface ExecutionCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `taskId` field. */
  taskId?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<Scalars["String"]>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: Maybe<Scalars["Datetime"]>;
  /** Checks for equality with the object’s `finishedAt` field. */
  finishedAt?: Maybe<Scalars["Datetime"]>;
}

/** An input for mutations affecting `Execution` */
export interface ExecutionInput {
  id?: Maybe<Scalars["BigInt"]>;
  taskId: Scalars["BigInt"];
  status?: Maybe<Scalars["String"]>;
  startedAt?: Maybe<Scalars["Datetime"]>;
  finishedAt?: Maybe<Scalars["Datetime"]>;
}

/** Represents an update to a `Execution`. Fields that are set will be updated. */
export interface ExecutionPatch {
  id?: Maybe<Scalars["BigInt"]>;
  taskId?: Maybe<Scalars["BigInt"]>;
  status?: Maybe<Scalars["String"]>;
  startedAt?: Maybe<Scalars["Datetime"]>;
  finishedAt?: Maybe<Scalars["Datetime"]>;
}

/** Methods to use when ordering `Execution`. */
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

/** All input for the `incTaskStat` mutation. */
export interface IncTaskStatInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  taskId?: Maybe<Scalars["BigInt"]>;
  collection?: Maybe<Scalars["String"]>;
  colName?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["Int"]>;
}

/** An interval of time that has passed where the smallest distinct unit is a second. */
export interface IntervalInput {
  /**
   * A quantity of seconds. This is the only non-integer field, as all the other
   * fields will dump their overflow into a smaller unit of time. Intervals don’t
   * have a smaller unit than seconds.
   */
  seconds?: Maybe<Scalars["Float"]>;
  /** A quantity of minutes. */
  minutes?: Maybe<Scalars["Int"]>;
  /** A quantity of hours. */
  hours?: Maybe<Scalars["Int"]>;
  /** A quantity of days. */
  days?: Maybe<Scalars["Int"]>;
  /** A quantity of months. */
  months?: Maybe<Scalars["Int"]>;
  /** A quantity of years. */
  years?: Maybe<Scalars["Int"]>;
}

/** A condition to be used against `Log` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface LogCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `executionId` field. */
  executionId?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `time` field. */
  time?: Maybe<Scalars["Datetime"]>;
  /** Checks for equality with the object’s `message` field. */
  message?: Maybe<Scalars["JSON"]>;
}

/** An input for mutations affecting `Log` */
export interface LogInput {
  id?: Maybe<Scalars["BigInt"]>;
  executionId: Scalars["BigInt"];
  time?: Maybe<Scalars["Datetime"]>;
  message?: Maybe<Scalars["JSON"]>;
}

/** Represents an update to a `Log`. Fields that are set will be updated. */
export interface LogPatch {
  id?: Maybe<Scalars["BigInt"]>;
  executionId?: Maybe<Scalars["BigInt"]>;
  time?: Maybe<Scalars["Datetime"]>;
  message?: Maybe<Scalars["JSON"]>;
}

/** Methods to use when ordering `Log`. */
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
 * A condition to be used against `Migration` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export interface MigrationCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars["String"]>;
  /** Checks for equality with the object’s `hash` field. */
  hash?: Maybe<Scalars["String"]>;
  /** Checks for equality with the object’s `executedAt` field. */
  executedAt?: Maybe<Scalars["Datetime"]>;
}

/** An input for mutations affecting `Migration` */
export interface MigrationInput {
  id: Scalars["Int"];
  name: Scalars["String"];
  hash: Scalars["String"];
  executedAt?: Maybe<Scalars["Datetime"]>;
}

/** Represents an update to a `Migration`. Fields that are set will be updated. */
export interface MigrationPatch {
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  hash?: Maybe<Scalars["String"]>;
  executedAt?: Maybe<Scalars["Datetime"]>;
}

/** Methods to use when ordering `Migration`. */
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

/** All input for the `processNextTask` mutation. */
export interface ProcessNextTaskInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  backoffDecay?: Maybe<Scalars["String"]>;
  backoffDelay?: Maybe<IntervalInput>;
  concurrentExecutions?: Maybe<Scalars["Int"]>;
  maxAttempts?: Maybe<Scalars["Int"]>;
}

/** A condition to be used against `Task` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface TaskCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars["String"]>;
  /** Checks for equality with the object’s `params` field. */
  params?: Maybe<Scalars["JSON"]>;
  /** Checks for equality with the object’s `context` field. */
  context?: Maybe<Scalars["JSON"]>;
  /** Checks for equality with the object’s `executeAt` field. */
  executeAt?: Maybe<Scalars["Datetime"]>;
  /** Checks for equality with the object’s `priority` field. */
  priority?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `locked` field. */
  locked?: Maybe<Scalars["Boolean"]>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<Scalars["String"]>;
  /** Checks for equality with the object’s `attempts` field. */
  attempts?: Maybe<Scalars["Int"]>;
}

/** An input for mutations affecting `Task` */
export interface TaskInput {
  id?: Maybe<Scalars["BigInt"]>;
  parentId?: Maybe<Scalars["BigInt"]>;
  name: Scalars["String"];
  params?: Maybe<Scalars["JSON"]>;
  context?: Maybe<Scalars["JSON"]>;
  executeAt?: Maybe<Scalars["Datetime"]>;
  priority?: Maybe<Scalars["Int"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  status: Scalars["String"];
  attempts?: Maybe<Scalars["Int"]>;
}

/** Represents an update to a `Task`. Fields that are set will be updated. */
export interface TaskPatch {
  id?: Maybe<Scalars["BigInt"]>;
  parentId?: Maybe<Scalars["BigInt"]>;
  name?: Maybe<Scalars["String"]>;
  params?: Maybe<Scalars["JSON"]>;
  context?: Maybe<Scalars["JSON"]>;
  executeAt?: Maybe<Scalars["Datetime"]>;
  priority?: Maybe<Scalars["Int"]>;
  locked?: Maybe<Scalars["Boolean"]>;
  status?: Maybe<Scalars["String"]>;
  attempts?: Maybe<Scalars["Int"]>;
}

/** Methods to use when ordering `Task`. */
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
 * A condition to be used against `TaskStat` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export interface TaskStatCondition {
  /** Checks for equality with the object’s `taskId` field. */
  taskId?: Maybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `collection` field. */
  collection?: Maybe<Scalars["String"]>;
  /** Checks for equality with the object’s `scheduled` field. */
  scheduled?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `pending` field. */
  pending?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `running` field. */
  running?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `failure` field. */
  failure?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `timeout` field. */
  timeout?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `success` field. */
  success?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `locked` field. */
  locked?: Maybe<Scalars["Int"]>;
  /** Checks for equality with the object’s `total` field. */
  total?: Maybe<Scalars["Int"]>;
}

/** An input for mutations affecting `TaskStat` */
export interface TaskStatInput {
  taskId?: Maybe<Scalars["BigInt"]>;
  collection: Scalars["String"];
  scheduled?: Maybe<Scalars["Int"]>;
  pending?: Maybe<Scalars["Int"]>;
  running?: Maybe<Scalars["Int"]>;
  failure?: Maybe<Scalars["Int"]>;
  timeout?: Maybe<Scalars["Int"]>;
  success?: Maybe<Scalars["Int"]>;
  locked?: Maybe<Scalars["Int"]>;
  total?: Maybe<Scalars["Int"]>;
}

/** Represents an update to a `TaskStat`. Fields that are set will be updated. */
export interface TaskStatPatch {
  taskId?: Maybe<Scalars["BigInt"]>;
  collection?: Maybe<Scalars["String"]>;
  scheduled?: Maybe<Scalars["Int"]>;
  pending?: Maybe<Scalars["Int"]>;
  running?: Maybe<Scalars["Int"]>;
  failure?: Maybe<Scalars["Int"]>;
  timeout?: Maybe<Scalars["Int"]>;
  success?: Maybe<Scalars["Int"]>;
  locked?: Maybe<Scalars["Int"]>;
  total?: Maybe<Scalars["Int"]>;
}

/** Methods to use when ordering `TaskStat`. */
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

/** All input for the `updateExecutionByNodeId` mutation. */
export interface UpdateExecutionByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Execution` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `Execution` being updated. */
  patch: ExecutionPatch;
}

/** All input for the `updateExecution` mutation. */
export interface UpdateExecutionInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `Execution` being updated. */
  patch: ExecutionPatch;
  id: Scalars["BigInt"];
}

/** All input for the `updateExecutionStatus` mutation. */
export interface UpdateExecutionStatusInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  newStatus?: Maybe<Scalars["String"]>;
  executionId?: Maybe<Scalars["BigInt"]>;
  taskId?: Maybe<Scalars["BigInt"]>;
  maxAttempts?: Maybe<Scalars["Int"]>;
}

/** All input for the `updateLogByNodeId` mutation. */
export interface UpdateLogByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Log` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `Log` being updated. */
  patch: LogPatch;
}

/** All input for the `updateLog` mutation. */
export interface UpdateLogInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `Log` being updated. */
  patch: LogPatch;
  id: Scalars["BigInt"];
}

/** All input for the `updateMigrationByName` mutation. */
export interface UpdateMigrationByNameInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `Migration` being updated. */
  patch: MigrationPatch;
  name: Scalars["String"];
}

/** All input for the `updateMigrationByNodeId` mutation. */
export interface UpdateMigrationByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Migration` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `Migration` being updated. */
  patch: MigrationPatch;
}

/** All input for the `updateMigration` mutation. */
export interface UpdateMigrationInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `Migration` being updated. */
  patch: MigrationPatch;
  id: Scalars["Int"];
}

/** All input for the `updateStats` mutation. */
export interface UpdateStatsInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  op?: Maybe<Scalars["String"]>;
  arg?: Maybe<Scalars["String"]>;
  old?: Maybe<TaskInput>;
  new?: Maybe<TaskInput>;
  collection?: Maybe<Scalars["String"]>;
  recurse?: Maybe<Scalars["Boolean"]>;
}

/** All input for the `updateTaskByNodeId` mutation. */
export interface UpdateTaskByNodeIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Task` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
}

/** All input for the `updateTask` mutation. */
export interface UpdateTaskInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
  id: Scalars["BigInt"];
}

/** All input for the `updateTaskStatByTaskIdAndCollection` mutation. */
export interface UpdateTaskStatByTaskIdAndCollectionInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `TaskStat` being updated. */
  patch: TaskStatPatch;
  taskId: Scalars["BigInt"];
  collection: Scalars["String"];
}

export const scalarsEnumsHash: import("gqless").ScalarsEnumsHash = {
  ID: true,
  Int: true,
  Cursor: true,
  ExecutionsOrderBy: true,
  BigInt: true,
  String: true,
  Datetime: true,
  JSON: true,
  Boolean: true,
  TasksOrderBy: true,
  TaskStatsOrderBy: true,
  LogsOrderBy: true,
  MigrationsOrderBy: true,
  Float: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    query: { __type: "Query!" },
    nodeId: { __type: "ID!" },
    node: { __type: "Node", __args: { nodeId: "ID!" } },
    executionsConnection: {
      __type: "ExecutionsConnection",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[ExecutionsOrderBy!]",
        condition: "ExecutionCondition",
      },
    },
    executions: {
      __type: "[Execution!]",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[ExecutionsOrderBy!]",
        condition: "ExecutionCondition",
      },
    },
    logsConnection: {
      __type: "LogsConnection",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[LogsOrderBy!]",
        condition: "LogCondition",
      },
    },
    logs: {
      __type: "[Log!]",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[LogsOrderBy!]",
        condition: "LogCondition",
      },
    },
    migrationsConnection: {
      __type: "MigrationsConnection",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[MigrationsOrderBy!]",
        condition: "MigrationCondition",
      },
    },
    migrations: {
      __type: "[Migration!]",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[MigrationsOrderBy!]",
        condition: "MigrationCondition",
      },
    },
    taskStatsConnection: {
      __type: "TaskStatsConnection",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[TaskStatsOrderBy!]",
        condition: "TaskStatCondition",
      },
    },
    taskStats: {
      __type: "[TaskStat!]",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[TaskStatsOrderBy!]",
        condition: "TaskStatCondition",
      },
    },
    tasksConnection: {
      __type: "TasksConnection",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    tasks: {
      __type: "[Task!]",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    execution: { __type: "Execution", __args: { id: "BigInt!" } },
    log: { __type: "Log", __args: { id: "BigInt!" } },
    migration: { __type: "Migration", __args: { id: "Int!" } },
    migrationByName: { __type: "Migration", __args: { name: "String!" } },
    taskStatByTaskIdAndCollection: {
      __type: "TaskStat",
      __args: { taskId: "BigInt!", collection: "String!" },
    },
    task: { __type: "Task", __args: { id: "BigInt!" } },
    childTasksConnection: {
      __type: "TasksConnection!",
      __args: {
        taskId: "BigInt",
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    childTasks: {
      __type: "[Task]",
      __args: {
        taskId: "BigInt",
        first: "Int",
        offset: "Int",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    descendantTasksConnection: {
      __type: "TasksConnection!",
      __args: {
        taskId: "BigInt",
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    descendantTasks: {
      __type: "[Task]!",
      __args: {
        taskId: "BigInt",
        first: "Int",
        offset: "Int",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    rootChildrenStats: { __type: "JSON" },
    rootDescendantsStats: { __type: "JSON" },
    executionByNodeId: { __type: "Execution", __args: { nodeId: "ID!" } },
    logByNodeId: { __type: "Log", __args: { nodeId: "ID!" } },
    migrationByNodeId: { __type: "Migration", __args: { nodeId: "ID!" } },
    taskByNodeId: { __type: "Task", __args: { nodeId: "ID!" } },
  },
  mutation: {
    __typename: { __type: "String!" },
    createExecution: {
      __type: "CreateExecutionPayload",
      __args: { input: "CreateExecutionInput!" },
    },
    createLog: {
      __type: "CreateLogPayload",
      __args: { input: "CreateLogInput!" },
    },
    createMigration: {
      __type: "CreateMigrationPayload",
      __args: { input: "CreateMigrationInput!" },
    },
    createTaskStat: {
      __type: "CreateTaskStatPayload",
      __args: { input: "CreateTaskStatInput!" },
    },
    createTask: {
      __type: "CreateTaskPayload",
      __args: { input: "CreateTaskInput!" },
    },
    updateExecutionByNodeId: {
      __type: "UpdateExecutionPayload",
      __args: { input: "UpdateExecutionByNodeIdInput!" },
    },
    updateExecution: {
      __type: "UpdateExecutionPayload",
      __args: { input: "UpdateExecutionInput!" },
    },
    updateLogByNodeId: {
      __type: "UpdateLogPayload",
      __args: { input: "UpdateLogByNodeIdInput!" },
    },
    updateLog: {
      __type: "UpdateLogPayload",
      __args: { input: "UpdateLogInput!" },
    },
    updateMigrationByNodeId: {
      __type: "UpdateMigrationPayload",
      __args: { input: "UpdateMigrationByNodeIdInput!" },
    },
    updateMigration: {
      __type: "UpdateMigrationPayload",
      __args: { input: "UpdateMigrationInput!" },
    },
    updateMigrationByName: {
      __type: "UpdateMigrationPayload",
      __args: { input: "UpdateMigrationByNameInput!" },
    },
    updateTaskStatByTaskIdAndCollection: {
      __type: "UpdateTaskStatPayload",
      __args: { input: "UpdateTaskStatByTaskIdAndCollectionInput!" },
    },
    updateTaskByNodeId: {
      __type: "UpdateTaskPayload",
      __args: { input: "UpdateTaskByNodeIdInput!" },
    },
    updateTask: {
      __type: "UpdateTaskPayload",
      __args: { input: "UpdateTaskInput!" },
    },
    deleteExecutionByNodeId: {
      __type: "DeleteExecutionPayload",
      __args: { input: "DeleteExecutionByNodeIdInput!" },
    },
    deleteExecution: {
      __type: "DeleteExecutionPayload",
      __args: { input: "DeleteExecutionInput!" },
    },
    deleteLogByNodeId: {
      __type: "DeleteLogPayload",
      __args: { input: "DeleteLogByNodeIdInput!" },
    },
    deleteLog: {
      __type: "DeleteLogPayload",
      __args: { input: "DeleteLogInput!" },
    },
    deleteMigrationByNodeId: {
      __type: "DeleteMigrationPayload",
      __args: { input: "DeleteMigrationByNodeIdInput!" },
    },
    deleteMigration: {
      __type: "DeleteMigrationPayload",
      __args: { input: "DeleteMigrationInput!" },
    },
    deleteMigrationByName: {
      __type: "DeleteMigrationPayload",
      __args: { input: "DeleteMigrationByNameInput!" },
    },
    deleteTaskStatByTaskIdAndCollection: {
      __type: "DeleteTaskStatPayload",
      __args: { input: "DeleteTaskStatByTaskIdAndCollectionInput!" },
    },
    deleteTaskByNodeId: {
      __type: "DeleteTaskPayload",
      __args: { input: "DeleteTaskByNodeIdInput!" },
    },
    deleteTask: {
      __type: "DeleteTaskPayload",
      __args: { input: "DeleteTaskInput!" },
    },
    executeTask: {
      __type: "ExecuteTaskPayload",
      __args: { input: "ExecuteTaskInput!" },
    },
    incTaskStat: {
      __type: "IncTaskStatPayload",
      __args: { input: "IncTaskStatInput!" },
    },
    processNextTask: {
      __type: "ProcessNextTaskPayload",
      __args: { input: "ProcessNextTaskInput!" },
    },
    updateExecutionStatus: {
      __type: "UpdateExecutionStatusPayload",
      __args: { input: "UpdateExecutionStatusInput!" },
    },
    updateStats: {
      __type: "UpdateStatsPayload",
      __args: { input: "UpdateStatsInput!" },
    },
  },
  subscription: {},
  Node: { __typename: { __type: "String!" }, nodeId: { __type: "ID!" } },
  ExecutionCondition: {
    id: { __type: "BigInt" },
    taskId: { __type: "BigInt" },
    status: { __type: "String" },
    startedAt: { __type: "Datetime" },
    finishedAt: { __type: "Datetime" },
  },
  ExecutionsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Execution]!" },
    edges: { __type: "[ExecutionsEdge!]!" },
    pageInfo: { __type: "PageInfo!" },
    totalCount: { __type: "Int!" },
  },
  Execution: {
    __typename: { __type: "String!" },
    nodeId: { __type: "ID!" },
    id: { __type: "BigInt!" },
    taskId: { __type: "BigInt!" },
    status: { __type: "String!" },
    startedAt: { __type: "Datetime!" },
    finishedAt: { __type: "Datetime" },
    task: { __type: "Task" },
    logsConnection: {
      __type: "LogsConnection!",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[LogsOrderBy!]",
        condition: "LogCondition",
      },
    },
    logs: {
      __type: "[Log!]!",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[LogsOrderBy!]",
        condition: "LogCondition",
      },
    },
    duration: { __type: "String" },
  },
  Task: {
    __typename: { __type: "String!" },
    nodeId: { __type: "ID!" },
    id: { __type: "BigInt!" },
    parentId: { __type: "BigInt" },
    name: { __type: "String!" },
    params: { __type: "JSON!" },
    context: { __type: "JSON!" },
    executeAt: { __type: "Datetime!" },
    priority: { __type: "Int!" },
    locked: { __type: "Boolean!" },
    status: { __type: "String!" },
    attempts: { __type: "Int!" },
    parent: { __type: "Task" },
    childTasksConnection: {
      __type: "TasksConnection!",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    childTasks: {
      __type: "[Task!]!",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[TasksOrderBy!]",
        condition: "TaskCondition",
      },
    },
    taskStatsConnection: {
      __type: "TaskStatsConnection!",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[TaskStatsOrderBy!]",
        condition: "TaskStatCondition",
      },
    },
    taskStats: {
      __type: "[TaskStat!]!",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[TaskStatsOrderBy!]",
        condition: "TaskStatCondition",
      },
    },
    executionsConnection: {
      __type: "ExecutionsConnection!",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
        orderBy: "[ExecutionsOrderBy!]",
        condition: "ExecutionCondition",
      },
    },
    executions: {
      __type: "[Execution!]!",
      __args: {
        first: "Int",
        offset: "Int",
        orderBy: "[ExecutionsOrderBy!]",
        condition: "ExecutionCondition",
      },
    },
    childrenStats: { __type: "JSON" },
    complete: { __type: "Boolean" },
    descendantTasksConnection: {
      __type: "TasksConnection!",
      __args: {
        first: "Int",
        last: "Int",
        offset: "Int",
        before: "Cursor",
        after: "Cursor",
      },
    },
    descendantTasks: {
      __type: "[Task]",
      __args: { first: "Int", offset: "Int" },
    },
    descendantsStats: { __type: "JSON" },
    lastExecuted: { __type: "Datetime" },
    latestExecution: { __type: "Execution" },
  },
  TaskCondition: {
    id: { __type: "BigInt" },
    parentId: { __type: "BigInt" },
    name: { __type: "String" },
    params: { __type: "JSON" },
    context: { __type: "JSON" },
    executeAt: { __type: "Datetime" },
    priority: { __type: "Int" },
    locked: { __type: "Boolean" },
    status: { __type: "String" },
    attempts: { __type: "Int" },
  },
  TasksConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Task]!" },
    edges: { __type: "[TasksEdge!]!" },
    pageInfo: { __type: "PageInfo!" },
    totalCount: { __type: "Int!" },
  },
  TasksEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "Cursor" },
    node: { __type: "Task" },
  },
  PageInfo: {
    __typename: { __type: "String!" },
    hasNextPage: { __type: "Boolean!" },
    hasPreviousPage: { __type: "Boolean!" },
    startCursor: { __type: "Cursor" },
    endCursor: { __type: "Cursor" },
  },
  TaskStatCondition: {
    taskId: { __type: "BigInt" },
    collection: { __type: "String" },
    scheduled: { __type: "Int" },
    pending: { __type: "Int" },
    running: { __type: "Int" },
    failure: { __type: "Int" },
    timeout: { __type: "Int" },
    success: { __type: "Int" },
    locked: { __type: "Int" },
    total: { __type: "Int" },
  },
  TaskStatsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[TaskStat]!" },
    edges: { __type: "[TaskStatsEdge!]!" },
    pageInfo: { __type: "PageInfo!" },
    totalCount: { __type: "Int!" },
  },
  TaskStat: {
    __typename: { __type: "String!" },
    taskId: { __type: "BigInt" },
    collection: { __type: "String!" },
    scheduled: { __type: "Int!" },
    pending: { __type: "Int!" },
    running: { __type: "Int!" },
    failure: { __type: "Int!" },
    timeout: { __type: "Int!" },
    success: { __type: "Int!" },
    locked: { __type: "Int!" },
    total: { __type: "Int!" },
    task: { __type: "Task" },
  },
  TaskStatsEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "Cursor" },
    node: { __type: "TaskStat" },
  },
  LogCondition: {
    id: { __type: "BigInt" },
    executionId: { __type: "BigInt" },
    time: { __type: "Datetime" },
    message: { __type: "JSON" },
  },
  LogsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Log]!" },
    edges: { __type: "[LogsEdge!]!" },
    pageInfo: { __type: "PageInfo!" },
    totalCount: { __type: "Int!" },
  },
  Log: {
    __typename: { __type: "String!" },
    nodeId: { __type: "ID!" },
    id: { __type: "BigInt!" },
    executionId: { __type: "BigInt!" },
    time: { __type: "Datetime!" },
    message: { __type: "JSON" },
    execution: { __type: "Execution" },
    messageParsed: { __type: "String" },
  },
  LogsEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "Cursor" },
    node: { __type: "Log" },
  },
  ExecutionsEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "Cursor" },
    node: { __type: "Execution" },
  },
  MigrationCondition: {
    id: { __type: "Int" },
    name: { __type: "String" },
    hash: { __type: "String" },
    executedAt: { __type: "Datetime" },
  },
  MigrationsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Migration]!" },
    edges: { __type: "[MigrationsEdge!]!" },
    pageInfo: { __type: "PageInfo!" },
    totalCount: { __type: "Int!" },
  },
  Migration: {
    __typename: { __type: "String!" },
    nodeId: { __type: "ID!" },
    id: { __type: "Int!" },
    name: { __type: "String!" },
    hash: { __type: "String!" },
    executedAt: { __type: "Datetime" },
  },
  MigrationsEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "Cursor" },
    node: { __type: "Migration" },
  },
  CreateExecutionInput: {
    clientMutationId: { __type: "String" },
    execution: { __type: "ExecutionInput!" },
  },
  ExecutionInput: {
    id: { __type: "BigInt" },
    taskId: { __type: "BigInt!" },
    status: { __type: "String" },
    startedAt: { __type: "Datetime" },
    finishedAt: { __type: "Datetime" },
  },
  CreateExecutionPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    execution: { __type: "Execution" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    executionEdge: {
      __type: "ExecutionsEdge",
      __args: { orderBy: "[ExecutionsOrderBy!]" },
    },
  },
  CreateLogInput: {
    clientMutationId: { __type: "String" },
    log: { __type: "LogInput!" },
  },
  LogInput: {
    id: { __type: "BigInt" },
    executionId: { __type: "BigInt!" },
    time: { __type: "Datetime" },
    message: { __type: "JSON" },
  },
  CreateLogPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    log: { __type: "Log" },
    query: { __type: "Query" },
    execution: { __type: "Execution" },
    logEdge: { __type: "LogsEdge", __args: { orderBy: "[LogsOrderBy!]" } },
  },
  CreateMigrationInput: {
    clientMutationId: { __type: "String" },
    migration: { __type: "MigrationInput!" },
  },
  MigrationInput: {
    id: { __type: "Int!" },
    name: { __type: "String!" },
    hash: { __type: "String!" },
    executedAt: { __type: "Datetime" },
  },
  CreateMigrationPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    migration: { __type: "Migration" },
    query: { __type: "Query" },
    migrationEdge: {
      __type: "MigrationsEdge",
      __args: { orderBy: "[MigrationsOrderBy!]" },
    },
  },
  CreateTaskStatInput: {
    clientMutationId: { __type: "String" },
    taskStat: { __type: "TaskStatInput!" },
  },
  TaskStatInput: {
    taskId: { __type: "BigInt" },
    collection: { __type: "String!" },
    scheduled: { __type: "Int" },
    pending: { __type: "Int" },
    running: { __type: "Int" },
    failure: { __type: "Int" },
    timeout: { __type: "Int" },
    success: { __type: "Int" },
    locked: { __type: "Int" },
    total: { __type: "Int" },
  },
  CreateTaskStatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    taskStat: { __type: "TaskStat" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    taskStatEdge: {
      __type: "TaskStatsEdge",
      __args: { orderBy: "[TaskStatsOrderBy!]" },
    },
  },
  CreateTaskInput: {
    clientMutationId: { __type: "String" },
    task: { __type: "TaskInput!" },
  },
  TaskInput: {
    id: { __type: "BigInt" },
    parentId: { __type: "BigInt" },
    name: { __type: "String!" },
    params: { __type: "JSON" },
    context: { __type: "JSON" },
    executeAt: { __type: "Datetime" },
    priority: { __type: "Int" },
    locked: { __type: "Boolean" },
    status: { __type: "String!" },
    attempts: { __type: "Int" },
  },
  CreateTaskPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    task: { __type: "Task" },
    query: { __type: "Query" },
    parent: { __type: "Task" },
    taskEdge: { __type: "TasksEdge", __args: { orderBy: "[TasksOrderBy!]" } },
  },
  UpdateExecutionByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
    patch: { __type: "ExecutionPatch!" },
  },
  ExecutionPatch: {
    id: { __type: "BigInt" },
    taskId: { __type: "BigInt" },
    status: { __type: "String" },
    startedAt: { __type: "Datetime" },
    finishedAt: { __type: "Datetime" },
  },
  UpdateExecutionPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    execution: { __type: "Execution" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    executionEdge: {
      __type: "ExecutionsEdge",
      __args: { orderBy: "[ExecutionsOrderBy!]" },
    },
  },
  UpdateExecutionInput: {
    clientMutationId: { __type: "String" },
    patch: { __type: "ExecutionPatch!" },
    id: { __type: "BigInt!" },
  },
  UpdateLogByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
    patch: { __type: "LogPatch!" },
  },
  LogPatch: {
    id: { __type: "BigInt" },
    executionId: { __type: "BigInt" },
    time: { __type: "Datetime" },
    message: { __type: "JSON" },
  },
  UpdateLogPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    log: { __type: "Log" },
    query: { __type: "Query" },
    execution: { __type: "Execution" },
    logEdge: { __type: "LogsEdge", __args: { orderBy: "[LogsOrderBy!]" } },
  },
  UpdateLogInput: {
    clientMutationId: { __type: "String" },
    patch: { __type: "LogPatch!" },
    id: { __type: "BigInt!" },
  },
  UpdateMigrationByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
    patch: { __type: "MigrationPatch!" },
  },
  MigrationPatch: {
    id: { __type: "Int" },
    name: { __type: "String" },
    hash: { __type: "String" },
    executedAt: { __type: "Datetime" },
  },
  UpdateMigrationPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    migration: { __type: "Migration" },
    query: { __type: "Query" },
    migrationEdge: {
      __type: "MigrationsEdge",
      __args: { orderBy: "[MigrationsOrderBy!]" },
    },
  },
  UpdateMigrationInput: {
    clientMutationId: { __type: "String" },
    patch: { __type: "MigrationPatch!" },
    id: { __type: "Int!" },
  },
  UpdateMigrationByNameInput: {
    clientMutationId: { __type: "String" },
    patch: { __type: "MigrationPatch!" },
    name: { __type: "String!" },
  },
  UpdateTaskStatByTaskIdAndCollectionInput: {
    clientMutationId: { __type: "String" },
    patch: { __type: "TaskStatPatch!" },
    taskId: { __type: "BigInt!" },
    collection: { __type: "String!" },
  },
  TaskStatPatch: {
    taskId: { __type: "BigInt" },
    collection: { __type: "String" },
    scheduled: { __type: "Int" },
    pending: { __type: "Int" },
    running: { __type: "Int" },
    failure: { __type: "Int" },
    timeout: { __type: "Int" },
    success: { __type: "Int" },
    locked: { __type: "Int" },
    total: { __type: "Int" },
  },
  UpdateTaskStatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    taskStat: { __type: "TaskStat" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    taskStatEdge: {
      __type: "TaskStatsEdge",
      __args: { orderBy: "[TaskStatsOrderBy!]" },
    },
  },
  UpdateTaskByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
    patch: { __type: "TaskPatch!" },
  },
  TaskPatch: {
    id: { __type: "BigInt" },
    parentId: { __type: "BigInt" },
    name: { __type: "String" },
    params: { __type: "JSON" },
    context: { __type: "JSON" },
    executeAt: { __type: "Datetime" },
    priority: { __type: "Int" },
    locked: { __type: "Boolean" },
    status: { __type: "String" },
    attempts: { __type: "Int" },
  },
  UpdateTaskPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    task: { __type: "Task" },
    query: { __type: "Query" },
    parent: { __type: "Task" },
    taskEdge: { __type: "TasksEdge", __args: { orderBy: "[TasksOrderBy!]" } },
  },
  UpdateTaskInput: {
    clientMutationId: { __type: "String" },
    patch: { __type: "TaskPatch!" },
    id: { __type: "BigInt!" },
  },
  DeleteExecutionByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
  },
  DeleteExecutionPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    execution: { __type: "Execution" },
    deletedExecutionNodeId: { __type: "ID" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    executionEdge: {
      __type: "ExecutionsEdge",
      __args: { orderBy: "[ExecutionsOrderBy!]" },
    },
  },
  DeleteExecutionInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "BigInt!" },
  },
  DeleteLogByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
  },
  DeleteLogPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    log: { __type: "Log" },
    deletedLogNodeId: { __type: "ID" },
    query: { __type: "Query" },
    execution: { __type: "Execution" },
    logEdge: { __type: "LogsEdge", __args: { orderBy: "[LogsOrderBy!]" } },
  },
  DeleteLogInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "BigInt!" },
  },
  DeleteMigrationByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
  },
  DeleteMigrationPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    migration: { __type: "Migration" },
    deletedMigrationNodeId: { __type: "ID" },
    query: { __type: "Query" },
    migrationEdge: {
      __type: "MigrationsEdge",
      __args: { orderBy: "[MigrationsOrderBy!]" },
    },
  },
  DeleteMigrationInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "Int!" },
  },
  DeleteMigrationByNameInput: {
    clientMutationId: { __type: "String" },
    name: { __type: "String!" },
  },
  DeleteTaskStatByTaskIdAndCollectionInput: {
    clientMutationId: { __type: "String" },
    taskId: { __type: "BigInt!" },
    collection: { __type: "String!" },
  },
  DeleteTaskStatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    taskStat: { __type: "TaskStat" },
    deletedTaskStatNodeId: { __type: "ID" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    taskStatEdge: {
      __type: "TaskStatsEdge",
      __args: { orderBy: "[TaskStatsOrderBy!]" },
    },
  },
  DeleteTaskByNodeIdInput: {
    clientMutationId: { __type: "String" },
    nodeId: { __type: "ID!" },
  },
  DeleteTaskPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    task: { __type: "Task" },
    deletedTaskNodeId: { __type: "ID" },
    query: { __type: "Query" },
    parent: { __type: "Task" },
    taskEdge: { __type: "TasksEdge", __args: { orderBy: "[TasksOrderBy!]" } },
  },
  DeleteTaskInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "BigInt!" },
  },
  ExecuteTaskInput: {
    clientMutationId: { __type: "String" },
    taskId: { __type: "BigInt" },
  },
  ExecuteTaskPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    execution: { __type: "Execution" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    executionEdge: {
      __type: "ExecutionsEdge",
      __args: { orderBy: "[ExecutionsOrderBy!]" },
    },
  },
  IncTaskStatInput: {
    clientMutationId: { __type: "String" },
    taskId: { __type: "BigInt" },
    collection: { __type: "String" },
    colName: { __type: "String" },
    value: { __type: "Int" },
  },
  IncTaskStatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    query: { __type: "Query" },
  },
  ProcessNextTaskInput: {
    clientMutationId: { __type: "String" },
    backoffDecay: { __type: "String" },
    backoffDelay: { __type: "IntervalInput" },
    concurrentExecutions: { __type: "Int" },
    maxAttempts: { __type: "Int" },
  },
  IntervalInput: {
    seconds: { __type: "Float" },
    minutes: { __type: "Int" },
    hours: { __type: "Int" },
    days: { __type: "Int" },
    months: { __type: "Int" },
    years: { __type: "Int" },
  },
  ProcessNextTaskPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    results: { __type: "[ProcessNextTaskRecord]" },
    query: { __type: "Query" },
  },
  ProcessNextTaskRecord: {
    __typename: { __type: "String!" },
    executionId: { __type: "BigInt" },
    taskName: { __type: "String" },
  },
  UpdateExecutionStatusInput: {
    clientMutationId: { __type: "String" },
    newStatus: { __type: "String" },
    executionId: { __type: "BigInt" },
    taskId: { __type: "BigInt" },
    maxAttempts: { __type: "Int" },
  },
  UpdateExecutionStatusPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    execution: { __type: "Execution" },
    query: { __type: "Query" },
    task: { __type: "Task" },
    executionEdge: {
      __type: "ExecutionsEdge",
      __args: { orderBy: "[ExecutionsOrderBy!]" },
    },
  },
  UpdateStatsInput: {
    clientMutationId: { __type: "String" },
    op: { __type: "String" },
    arg: { __type: "String" },
    old: { __type: "TaskInput" },
    new: { __type: "TaskInput" },
    collection: { __type: "String" },
    recurse: { __type: "Boolean" },
  },
  UpdateStatsPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    query: { __type: "Query" },
  },
} as const;

/**
 * The root query type which gives access points into the data universe.
 */
export interface Query extends Omit<Node, "__typename"> {
  __typename: "Query" | undefined;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /**
   * The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`.
   */
  nodeId: ScalarsEnums["ID"];
  /**
   * Fetches an object given its globally unique `ID`.
   */
  node: (args: {
    /**
     * The globally unique `ID`.
     */
    nodeId: Scalars["ID"];
  }) => Maybe<Node>;
  /**
   * Reads and enables pagination through a set of `Execution`.
   */
  executionsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<ExecutionsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<ExecutionCondition>;
  }) => Maybe<ExecutionsConnection>;
  /**
   * Reads a set of `Execution`.
   */
  executions: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Execution`.
     */;
    orderBy?: Maybe<Array<ExecutionsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<ExecutionCondition>;
  }) => Maybe<Array<Execution>>;
  /**
   * Reads and enables pagination through a set of `Log`.
   */
  logsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Log`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<LogsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<LogCondition>;
  }) => Maybe<LogsConnection>;
  /**
   * Reads a set of `Log`.
   */
  logs: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Log`.
     */;
    orderBy?: Maybe<Array<LogsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<LogCondition>;
  }) => Maybe<Array<Log>>;
  /**
   * Reads and enables pagination through a set of `Migration`.
   */
  migrationsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Migration`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<MigrationsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<MigrationCondition>;
  }) => Maybe<MigrationsConnection>;
  /**
   * Reads a set of `Migration`.
   */
  migrations: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Migration`.
     */;
    orderBy?: Maybe<Array<MigrationsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<MigrationCondition>;
  }) => Maybe<Array<Migration>>;
  /**
   * Reads and enables pagination through a set of `TaskStat`.
   */
  taskStatsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `TaskStat`.
     * @defaultValue `["NATURAL"]`
     */;
    orderBy?: Maybe<Array<TaskStatsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskStatCondition>;
  }) => Maybe<TaskStatsConnection>;
  /**
   * Reads a set of `TaskStat`.
   */
  taskStats: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `TaskStat`.
     */;
    orderBy?: Maybe<Array<TaskStatsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskStatCondition>;
  }) => Maybe<Array<TaskStat>>;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  tasksConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Task`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => Maybe<TasksConnection>;
  /**
   * Reads a set of `Task`.
   */
  tasks: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Task`.
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => Maybe<Array<Task>>;
  execution: (args: { id: Scalars["BigInt"] }) => Maybe<Execution>;
  log: (args: { id: Scalars["BigInt"] }) => Maybe<Log>;
  migration: (args: { id: Scalars["Int"] }) => Maybe<Migration>;
  migrationByName: (args: { name: Scalars["String"] }) => Maybe<Migration>;
  taskStatByTaskIdAndCollection: (args: {
    taskId: Scalars["BigInt"];
    collection: Scalars["String"];
  }) => Maybe<TaskStat>;
  task: (args: { id: Scalars["BigInt"] }) => Maybe<Task>;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  childTasksConnection: (args?: {
    taskId?: Maybe<Scalars["BigInt"]>
    /**
     * Only read the first `n` values of the set.
     */;
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Task`.
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => TasksConnection;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  childTasks: (args?: {
    taskId?: Maybe<Scalars["BigInt"]>
    /**
     * Only read the first `n` values of the set.
     */;
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Task`.
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => Maybe<Array<Maybe<Task>>>;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  descendantTasksConnection: (args?: {
    taskId?: Maybe<Scalars["BigInt"]>
    /**
     * Only read the first `n` values of the set.
     */;
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Task`.
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => TasksConnection;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  descendantTasks: (args?: {
    taskId?: Maybe<Scalars["BigInt"]>
    /**
     * Only read the first `n` values of the set.
     */;
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Task`.
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => Array<Maybe<Task>>;
  rootChildrenStats?: Maybe<ScalarsEnums["JSON"]>;
  rootDescendantsStats?: Maybe<ScalarsEnums["JSON"]>;
  /**
   * Reads a single `Execution` using its globally unique `ID`.
   */
  executionByNodeId: (args: {
    /**
     * The globally unique `ID` to be used in selecting a single `Execution`.
     */
    nodeId: Scalars["ID"];
  }) => Maybe<Execution>;
  /**
   * Reads a single `Log` using its globally unique `ID`.
   */
  logByNodeId: (args: {
    /**
     * The globally unique `ID` to be used in selecting a single `Log`.
     */
    nodeId: Scalars["ID"];
  }) => Maybe<Log>;
  /**
   * Reads a single `Migration` using its globally unique `ID`.
   */
  migrationByNodeId: (args: {
    /**
     * The globally unique `ID` to be used in selecting a single `Migration`.
     */
    nodeId: Scalars["ID"];
  }) => Maybe<Migration>;
  /**
   * Reads a single `Task` using its globally unique `ID`.
   */
  taskByNodeId: (args: {
    /**
     * The globally unique `ID` to be used in selecting a single `Task`.
     */
    nodeId: Scalars["ID"];
  }) => Maybe<Task>;
}

/**
 * The root mutation type which contains root level fields which mutate data.
 */
export interface Mutation {
  __typename: "Mutation" | undefined;
  /**
   * Creates a single `Execution`.
   */
  createExecution: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: CreateExecutionInput;
  }) => Maybe<CreateExecutionPayload>;
  /**
   * Creates a single `Log`.
   */
  createLog: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: CreateLogInput;
  }) => Maybe<CreateLogPayload>;
  /**
   * Creates a single `Migration`.
   */
  createMigration: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: CreateMigrationInput;
  }) => Maybe<CreateMigrationPayload>;
  /**
   * Creates a single `TaskStat`.
   */
  createTaskStat: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: CreateTaskStatInput;
  }) => Maybe<CreateTaskStatPayload>;
  /**
   * Creates a single `Task`.
   */
  createTask: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: CreateTaskInput;
  }) => Maybe<CreateTaskPayload>;
  /**
   * Updates a single `Execution` using its globally unique id and a patch.
   */
  updateExecutionByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateExecutionByNodeIdInput;
  }) => Maybe<UpdateExecutionPayload>;
  /**
   * Updates a single `Execution` using a unique key and a patch.
   */
  updateExecution: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateExecutionInput;
  }) => Maybe<UpdateExecutionPayload>;
  /**
   * Updates a single `Log` using its globally unique id and a patch.
   */
  updateLogByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateLogByNodeIdInput;
  }) => Maybe<UpdateLogPayload>;
  /**
   * Updates a single `Log` using a unique key and a patch.
   */
  updateLog: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateLogInput;
  }) => Maybe<UpdateLogPayload>;
  /**
   * Updates a single `Migration` using its globally unique id and a patch.
   */
  updateMigrationByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateMigrationByNodeIdInput;
  }) => Maybe<UpdateMigrationPayload>;
  /**
   * Updates a single `Migration` using a unique key and a patch.
   */
  updateMigration: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateMigrationInput;
  }) => Maybe<UpdateMigrationPayload>;
  /**
   * Updates a single `Migration` using a unique key and a patch.
   */
  updateMigrationByName: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateMigrationByNameInput;
  }) => Maybe<UpdateMigrationPayload>;
  /**
   * Updates a single `TaskStat` using a unique key and a patch.
   */
  updateTaskStatByTaskIdAndCollection: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateTaskStatByTaskIdAndCollectionInput;
  }) => Maybe<UpdateTaskStatPayload>;
  /**
   * Updates a single `Task` using its globally unique id and a patch.
   */
  updateTaskByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateTaskByNodeIdInput;
  }) => Maybe<UpdateTaskPayload>;
  /**
   * Updates a single `Task` using a unique key and a patch.
   */
  updateTask: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateTaskInput;
  }) => Maybe<UpdateTaskPayload>;
  /**
   * Deletes a single `Execution` using its globally unique id.
   */
  deleteExecutionByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteExecutionByNodeIdInput;
  }) => Maybe<DeleteExecutionPayload>;
  /**
   * Deletes a single `Execution` using a unique key.
   */
  deleteExecution: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteExecutionInput;
  }) => Maybe<DeleteExecutionPayload>;
  /**
   * Deletes a single `Log` using its globally unique id.
   */
  deleteLogByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteLogByNodeIdInput;
  }) => Maybe<DeleteLogPayload>;
  /**
   * Deletes a single `Log` using a unique key.
   */
  deleteLog: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteLogInput;
  }) => Maybe<DeleteLogPayload>;
  /**
   * Deletes a single `Migration` using its globally unique id.
   */
  deleteMigrationByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteMigrationByNodeIdInput;
  }) => Maybe<DeleteMigrationPayload>;
  /**
   * Deletes a single `Migration` using a unique key.
   */
  deleteMigration: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteMigrationInput;
  }) => Maybe<DeleteMigrationPayload>;
  /**
   * Deletes a single `Migration` using a unique key.
   */
  deleteMigrationByName: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteMigrationByNameInput;
  }) => Maybe<DeleteMigrationPayload>;
  /**
   * Deletes a single `TaskStat` using a unique key.
   */
  deleteTaskStatByTaskIdAndCollection: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteTaskStatByTaskIdAndCollectionInput;
  }) => Maybe<DeleteTaskStatPayload>;
  /**
   * Deletes a single `Task` using its globally unique id.
   */
  deleteTaskByNodeId: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteTaskByNodeIdInput;
  }) => Maybe<DeleteTaskPayload>;
  /**
   * Deletes a single `Task` using a unique key.
   */
  deleteTask: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: DeleteTaskInput;
  }) => Maybe<DeleteTaskPayload>;
  executeTask: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: ExecuteTaskInput;
  }) => Maybe<ExecuteTaskPayload>;
  incTaskStat: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IncTaskStatInput;
  }) => Maybe<IncTaskStatPayload>;
  processNextTask: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: ProcessNextTaskInput;
  }) => Maybe<ProcessNextTaskPayload>;
  updateExecutionStatus: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateExecutionStatusInput;
  }) => Maybe<UpdateExecutionStatusPayload>;
  updateStats: (args: {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: UpdateStatsInput;
  }) => Maybe<UpdateStatsPayload>;
}

export interface Subscription {
  __typename: "Subscription" | undefined;
}

/**
 * An object with a globally unique `ID`.
 */
export interface Node {
  __typename: "Node" | undefined;
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: ScalarsEnums["ID"];
}

/**
 * A connection to a list of `Execution` values.
 */
export interface ExecutionsConnection {
  __typename: "ExecutionsConnection" | undefined;
  /**
   * A list of `Execution` objects.
   */
  nodes: Array<Maybe<Execution>>;
  /**
   * A list of edges which contains the `Execution` and cursor to aid in pagination.
   */
  edges: Array<ExecutionsEdge>;
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo;
  /**
   * The count of *all* `Execution` you could get from the connection.
   */
  totalCount: ScalarsEnums["Int"];
}

export interface Execution extends Omit<Node, "__typename"> {
  __typename: "Execution" | undefined;
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: ScalarsEnums["ID"];
  id: ScalarsEnums["BigInt"];
  taskId: ScalarsEnums["BigInt"];
  status: ScalarsEnums["String"];
  startedAt: ScalarsEnums["Datetime"];
  finishedAt?: Maybe<ScalarsEnums["Datetime"]>;
  /**
   * Reads a single `Task` that is related to this `Execution`.
   */
  task?: Maybe<Task>;
  /**
   * Reads and enables pagination through a set of `Log`.
   */
  logsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Log`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<LogsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<LogCondition>;
  }) => LogsConnection;
  /**
   * Reads and enables pagination through a set of `Log`.
   */
  logs: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Log`.
     */;
    orderBy?: Maybe<Array<LogsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<LogCondition>;
  }) => Array<Log>;
  duration?: Maybe<ScalarsEnums["String"]>;
}

export interface Task extends Omit<Node, "__typename"> {
  __typename: "Task" | undefined;
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: ScalarsEnums["ID"];
  id: ScalarsEnums["BigInt"];
  parentId?: Maybe<ScalarsEnums["BigInt"]>;
  name: ScalarsEnums["String"];
  params: ScalarsEnums["JSON"];
  context: ScalarsEnums["JSON"];
  executeAt: ScalarsEnums["Datetime"];
  priority: ScalarsEnums["Int"];
  locked: ScalarsEnums["Boolean"];
  status: ScalarsEnums["String"];
  attempts: ScalarsEnums["Int"];
  /**
   * Reads a single `Task` that is related to this `Task`.
   */
  parent?: Maybe<Task>;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  childTasksConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Task`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => TasksConnection;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  childTasks: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Task`.
     */;
    orderBy?: Maybe<Array<TasksOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskCondition>;
  }) => Array<Task>;
  /**
   * Reads and enables pagination through a set of `TaskStat`.
   */
  taskStatsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `TaskStat`.
     * @defaultValue `["NATURAL"]`
     */;
    orderBy?: Maybe<Array<TaskStatsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskStatCondition>;
  }) => TaskStatsConnection;
  /**
   * Reads and enables pagination through a set of `TaskStat`.
   */
  taskStats: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `TaskStat`.
     */;
    orderBy?: Maybe<Array<TaskStatsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<TaskStatCondition>;
  }) => Array<TaskStat>;
  /**
   * Reads and enables pagination through a set of `Execution`.
   */
  executionsConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */;
    orderBy?: Maybe<Array<ExecutionsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<ExecutionCondition>;
  }) => ExecutionsConnection;
  /**
   * Reads and enables pagination through a set of `Execution`.
   */
  executions: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * The method to use when ordering `Execution`.
     */;
    orderBy?: Maybe<Array<ExecutionsOrderBy>>
    /**
     * A condition to be used in determining which values should be returned by the collection.
     */;
    condition?: Maybe<ExecutionCondition>;
  }) => Array<Execution>;
  childrenStats?: Maybe<ScalarsEnums["JSON"]>;
  complete?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  descendantTasksConnection: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Only read the last `n` values of the set.
     */;
    last?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * Read all values in the set before (above) this cursor.
     */;
    before?: Maybe<Scalars["Cursor"]>
    /**
     * Read all values in the set after (below) this cursor.
     */;
    after?: Maybe<Scalars["Cursor"]>;
  }) => TasksConnection;
  /**
   * Reads and enables pagination through a set of `Task`.
   */
  descendantTasks: (args?: {
    /**
     * Only read the first `n` values of the set.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Skip the first `n` values.
     */;
    offset?: Maybe<Scalars["Int"]>;
  }) => Maybe<Array<Maybe<Task>>>;
  descendantsStats?: Maybe<ScalarsEnums["JSON"]>;
  lastExecuted?: Maybe<ScalarsEnums["Datetime"]>;
  latestExecution?: Maybe<Execution>;
}

/**
 * A connection to a list of `Task` values.
 */
export interface TasksConnection {
  __typename: "TasksConnection" | undefined;
  /**
   * A list of `Task` objects.
   */
  nodes: Array<Maybe<Task>>;
  /**
   * A list of edges which contains the `Task` and cursor to aid in pagination.
   */
  edges: Array<TasksEdge>;
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo;
  /**
   * The count of *all* `Task` you could get from the connection.
   */
  totalCount: ScalarsEnums["Int"];
}

/**
 * A `Task` edge in the connection.
 */
export interface TasksEdge {
  __typename: "TasksEdge" | undefined;
  /**
   * A cursor for use in pagination.
   */
  cursor?: Maybe<ScalarsEnums["Cursor"]>;
  /**
   * The `Task` at the end of the edge.
   */
  node?: Maybe<Task>;
}

/**
 * Information about pagination in a connection.
 */
export interface PageInfo {
  __typename: "PageInfo" | undefined;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums["Boolean"];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums["Boolean"];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums["Cursor"]>;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums["Cursor"]>;
}

/**
 * A connection to a list of `TaskStat` values.
 */
export interface TaskStatsConnection {
  __typename: "TaskStatsConnection" | undefined;
  /**
   * A list of `TaskStat` objects.
   */
  nodes: Array<Maybe<TaskStat>>;
  /**
   * A list of edges which contains the `TaskStat` and cursor to aid in pagination.
   */
  edges: Array<TaskStatsEdge>;
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo;
  /**
   * The count of *all* `TaskStat` you could get from the connection.
   */
  totalCount: ScalarsEnums["Int"];
}

export interface TaskStat {
  __typename: "TaskStat" | undefined;
  taskId?: Maybe<ScalarsEnums["BigInt"]>;
  collection: ScalarsEnums["String"];
  scheduled: ScalarsEnums["Int"];
  pending: ScalarsEnums["Int"];
  running: ScalarsEnums["Int"];
  failure: ScalarsEnums["Int"];
  timeout: ScalarsEnums["Int"];
  success: ScalarsEnums["Int"];
  locked: ScalarsEnums["Int"];
  total: ScalarsEnums["Int"];
  /**
   * Reads a single `Task` that is related to this `TaskStat`.
   */
  task?: Maybe<Task>;
}

/**
 * A `TaskStat` edge in the connection.
 */
export interface TaskStatsEdge {
  __typename: "TaskStatsEdge" | undefined;
  /**
   * A cursor for use in pagination.
   */
  cursor?: Maybe<ScalarsEnums["Cursor"]>;
  /**
   * The `TaskStat` at the end of the edge.
   */
  node?: Maybe<TaskStat>;
}

/**
 * A connection to a list of `Log` values.
 */
export interface LogsConnection {
  __typename: "LogsConnection" | undefined;
  /**
   * A list of `Log` objects.
   */
  nodes: Array<Maybe<Log>>;
  /**
   * A list of edges which contains the `Log` and cursor to aid in pagination.
   */
  edges: Array<LogsEdge>;
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo;
  /**
   * The count of *all* `Log` you could get from the connection.
   */
  totalCount: ScalarsEnums["Int"];
}

export interface Log extends Omit<Node, "__typename"> {
  __typename: "Log" | undefined;
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: ScalarsEnums["ID"];
  id: ScalarsEnums["BigInt"];
  executionId: ScalarsEnums["BigInt"];
  time: ScalarsEnums["Datetime"];
  message?: Maybe<ScalarsEnums["JSON"]>;
  /**
   * Reads a single `Execution` that is related to this `Log`.
   */
  execution?: Maybe<Execution>;
  messageParsed?: Maybe<ScalarsEnums["String"]>;
}

/**
 * A `Log` edge in the connection.
 */
export interface LogsEdge {
  __typename: "LogsEdge" | undefined;
  /**
   * A cursor for use in pagination.
   */
  cursor?: Maybe<ScalarsEnums["Cursor"]>;
  /**
   * The `Log` at the end of the edge.
   */
  node?: Maybe<Log>;
}

/**
 * A `Execution` edge in the connection.
 */
export interface ExecutionsEdge {
  __typename: "ExecutionsEdge" | undefined;
  /**
   * A cursor for use in pagination.
   */
  cursor?: Maybe<ScalarsEnums["Cursor"]>;
  /**
   * The `Execution` at the end of the edge.
   */
  node?: Maybe<Execution>;
}

/**
 * A connection to a list of `Migration` values.
 */
export interface MigrationsConnection {
  __typename: "MigrationsConnection" | undefined;
  /**
   * A list of `Migration` objects.
   */
  nodes: Array<Maybe<Migration>>;
  /**
   * A list of edges which contains the `Migration` and cursor to aid in pagination.
   */
  edges: Array<MigrationsEdge>;
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo;
  /**
   * The count of *all* `Migration` you could get from the connection.
   */
  totalCount: ScalarsEnums["Int"];
}

export interface Migration extends Omit<Node, "__typename"> {
  __typename: "Migration" | undefined;
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: ScalarsEnums["ID"];
  id: ScalarsEnums["Int"];
  name: ScalarsEnums["String"];
  hash: ScalarsEnums["String"];
  executedAt?: Maybe<ScalarsEnums["Datetime"]>;
}

/**
 * A `Migration` edge in the connection.
 */
export interface MigrationsEdge {
  __typename: "MigrationsEdge" | undefined;
  /**
   * A cursor for use in pagination.
   */
  cursor?: Maybe<ScalarsEnums["Cursor"]>;
  /**
   * The `Migration` at the end of the edge.
   */
  node?: Maybe<Migration>;
}

/**
 * The output of our create `Execution` mutation.
 */
export interface CreateExecutionPayload {
  __typename: "CreateExecutionPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Execution` that was created by this mutation.
   */
  execution?: Maybe<Execution>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Execution`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `Execution`. May be used by Relay 1.
   */
  executionEdge: (args?: {
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<ExecutionsOrderBy>>;
  }) => Maybe<ExecutionsEdge>;
}

/**
 * The output of our create `Log` mutation.
 */
export interface CreateLogPayload {
  __typename: "CreateLogPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Log` that was created by this mutation.
   */
  log?: Maybe<Log>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Execution` that is related to this `Log`.
   */
  execution?: Maybe<Execution>;
  /**
   * An edge for our `Log`. May be used by Relay 1.
   */
  logEdge: (args?: {
    /**
     * The method to use when ordering `Log`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<LogsOrderBy>>;
  }) => Maybe<LogsEdge>;
}

/**
 * The output of our create `Migration` mutation.
 */
export interface CreateMigrationPayload {
  __typename: "CreateMigrationPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Migration` that was created by this mutation.
   */
  migration?: Maybe<Migration>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * An edge for our `Migration`. May be used by Relay 1.
   */
  migrationEdge: (args?: {
    /**
     * The method to use when ordering `Migration`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<MigrationsOrderBy>>;
  }) => Maybe<MigrationsEdge>;
}

/**
 * The output of our create `TaskStat` mutation.
 */
export interface CreateTaskStatPayload {
  __typename: "CreateTaskStatPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `TaskStat` that was created by this mutation.
   */
  taskStat?: Maybe<TaskStat>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `TaskStat`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `TaskStat`. May be used by Relay 1.
   */
  taskStatEdge: (args?: {
    /**
     * The method to use when ordering `TaskStat`.
     * @defaultValue `["NATURAL"]`
     */
    orderBy?: Maybe<Array<TaskStatsOrderBy>>;
  }) => Maybe<TaskStatsEdge>;
}

/**
 * The output of our create `Task` mutation.
 */
export interface CreateTaskPayload {
  __typename: "CreateTaskPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Task` that was created by this mutation.
   */
  task?: Maybe<Task>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Task`.
   */
  parent?: Maybe<Task>;
  /**
   * An edge for our `Task`. May be used by Relay 1.
   */
  taskEdge: (args?: {
    /**
     * The method to use when ordering `Task`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<TasksOrderBy>>;
  }) => Maybe<TasksEdge>;
}

/**
 * The output of our update `Execution` mutation.
 */
export interface UpdateExecutionPayload {
  __typename: "UpdateExecutionPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Execution` that was updated by this mutation.
   */
  execution?: Maybe<Execution>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Execution`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `Execution`. May be used by Relay 1.
   */
  executionEdge: (args?: {
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<ExecutionsOrderBy>>;
  }) => Maybe<ExecutionsEdge>;
}

/**
 * The output of our update `Log` mutation.
 */
export interface UpdateLogPayload {
  __typename: "UpdateLogPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Log` that was updated by this mutation.
   */
  log?: Maybe<Log>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Execution` that is related to this `Log`.
   */
  execution?: Maybe<Execution>;
  /**
   * An edge for our `Log`. May be used by Relay 1.
   */
  logEdge: (args?: {
    /**
     * The method to use when ordering `Log`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<LogsOrderBy>>;
  }) => Maybe<LogsEdge>;
}

/**
 * The output of our update `Migration` mutation.
 */
export interface UpdateMigrationPayload {
  __typename: "UpdateMigrationPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Migration` that was updated by this mutation.
   */
  migration?: Maybe<Migration>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * An edge for our `Migration`. May be used by Relay 1.
   */
  migrationEdge: (args?: {
    /**
     * The method to use when ordering `Migration`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<MigrationsOrderBy>>;
  }) => Maybe<MigrationsEdge>;
}

/**
 * The output of our update `TaskStat` mutation.
 */
export interface UpdateTaskStatPayload {
  __typename: "UpdateTaskStatPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `TaskStat` that was updated by this mutation.
   */
  taskStat?: Maybe<TaskStat>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `TaskStat`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `TaskStat`. May be used by Relay 1.
   */
  taskStatEdge: (args?: {
    /**
     * The method to use when ordering `TaskStat`.
     * @defaultValue `["NATURAL"]`
     */
    orderBy?: Maybe<Array<TaskStatsOrderBy>>;
  }) => Maybe<TaskStatsEdge>;
}

/**
 * The output of our update `Task` mutation.
 */
export interface UpdateTaskPayload {
  __typename: "UpdateTaskPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Task` that was updated by this mutation.
   */
  task?: Maybe<Task>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Task`.
   */
  parent?: Maybe<Task>;
  /**
   * An edge for our `Task`. May be used by Relay 1.
   */
  taskEdge: (args?: {
    /**
     * The method to use when ordering `Task`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<TasksOrderBy>>;
  }) => Maybe<TasksEdge>;
}

/**
 * The output of our delete `Execution` mutation.
 */
export interface DeleteExecutionPayload {
  __typename: "DeleteExecutionPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Execution` that was deleted by this mutation.
   */
  execution?: Maybe<Execution>;
  deletedExecutionNodeId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Execution`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `Execution`. May be used by Relay 1.
   */
  executionEdge: (args?: {
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<ExecutionsOrderBy>>;
  }) => Maybe<ExecutionsEdge>;
}

/**
 * The output of our delete `Log` mutation.
 */
export interface DeleteLogPayload {
  __typename: "DeleteLogPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Log` that was deleted by this mutation.
   */
  log?: Maybe<Log>;
  deletedLogNodeId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Execution` that is related to this `Log`.
   */
  execution?: Maybe<Execution>;
  /**
   * An edge for our `Log`. May be used by Relay 1.
   */
  logEdge: (args?: {
    /**
     * The method to use when ordering `Log`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<LogsOrderBy>>;
  }) => Maybe<LogsEdge>;
}

/**
 * The output of our delete `Migration` mutation.
 */
export interface DeleteMigrationPayload {
  __typename: "DeleteMigrationPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Migration` that was deleted by this mutation.
   */
  migration?: Maybe<Migration>;
  deletedMigrationNodeId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * An edge for our `Migration`. May be used by Relay 1.
   */
  migrationEdge: (args?: {
    /**
     * The method to use when ordering `Migration`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<MigrationsOrderBy>>;
  }) => Maybe<MigrationsEdge>;
}

/**
 * The output of our delete `TaskStat` mutation.
 */
export interface DeleteTaskStatPayload {
  __typename: "DeleteTaskStatPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `TaskStat` that was deleted by this mutation.
   */
  taskStat?: Maybe<TaskStat>;
  deletedTaskStatNodeId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `TaskStat`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `TaskStat`. May be used by Relay 1.
   */
  taskStatEdge: (args?: {
    /**
     * The method to use when ordering `TaskStat`.
     * @defaultValue `["NATURAL"]`
     */
    orderBy?: Maybe<Array<TaskStatsOrderBy>>;
  }) => Maybe<TaskStatsEdge>;
}

/**
 * The output of our delete `Task` mutation.
 */
export interface DeleteTaskPayload {
  __typename: "DeleteTaskPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The `Task` that was deleted by this mutation.
   */
  task?: Maybe<Task>;
  deletedTaskNodeId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Task`.
   */
  parent?: Maybe<Task>;
  /**
   * An edge for our `Task`. May be used by Relay 1.
   */
  taskEdge: (args?: {
    /**
     * The method to use when ordering `Task`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<TasksOrderBy>>;
  }) => Maybe<TasksEdge>;
}

/**
 * The output of our `executeTask` mutation.
 */
export interface ExecuteTaskPayload {
  __typename: "ExecuteTaskPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  execution?: Maybe<Execution>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Execution`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `Execution`. May be used by Relay 1.
   */
  executionEdge: (args?: {
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<ExecutionsOrderBy>>;
  }) => Maybe<ExecutionsEdge>;
}

/**
 * The output of our `incTaskStat` mutation.
 */
export interface IncTaskStatPayload {
  __typename: "IncTaskStatPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
}

/**
 * The output of our `processNextTask` mutation.
 */
export interface ProcessNextTaskPayload {
  __typename: "ProcessNextTaskPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  results?: Maybe<Array<Maybe<ProcessNextTaskRecord>>>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
}

/**
 * The return type of our `processNextTask` mutation.
 */
export interface ProcessNextTaskRecord {
  __typename: "ProcessNextTaskRecord" | undefined;
  executionId?: Maybe<ScalarsEnums["BigInt"]>;
  taskName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The output of our `updateExecutionStatus` mutation.
 */
export interface UpdateExecutionStatusPayload {
  __typename: "UpdateExecutionStatusPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  execution?: Maybe<Execution>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
  /**
   * Reads a single `Task` that is related to this `Execution`.
   */
  task?: Maybe<Task>;
  /**
   * An edge for our `Execution`. May be used by Relay 1.
   */
  executionEdge: (args?: {
    /**
     * The method to use when ordering `Execution`.
     * @defaultValue `["PRIMARY_KEY_ASC"]`
     */
    orderBy?: Maybe<Array<ExecutionsOrderBy>>;
  }) => Maybe<ExecutionsEdge>;
}

/**
 * The output of our `updateStats` mutation.
 */
export interface UpdateStatsPayload {
  __typename: "UpdateStatsPayload" | undefined;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * Our root query field type. Allows us to run any query from our mutation payload.
   */
  query?: Maybe<Query>;
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  Node: Node;
  ExecutionsConnection: ExecutionsConnection;
  Execution: Execution;
  Task: Task;
  TasksConnection: TasksConnection;
  TasksEdge: TasksEdge;
  PageInfo: PageInfo;
  TaskStatsConnection: TaskStatsConnection;
  TaskStat: TaskStat;
  TaskStatsEdge: TaskStatsEdge;
  LogsConnection: LogsConnection;
  Log: Log;
  LogsEdge: LogsEdge;
  ExecutionsEdge: ExecutionsEdge;
  MigrationsConnection: MigrationsConnection;
  Migration: Migration;
  MigrationsEdge: MigrationsEdge;
  CreateExecutionPayload: CreateExecutionPayload;
  CreateLogPayload: CreateLogPayload;
  CreateMigrationPayload: CreateMigrationPayload;
  CreateTaskStatPayload: CreateTaskStatPayload;
  CreateTaskPayload: CreateTaskPayload;
  UpdateExecutionPayload: UpdateExecutionPayload;
  UpdateLogPayload: UpdateLogPayload;
  UpdateMigrationPayload: UpdateMigrationPayload;
  UpdateTaskStatPayload: UpdateTaskStatPayload;
  UpdateTaskPayload: UpdateTaskPayload;
  DeleteExecutionPayload: DeleteExecutionPayload;
  DeleteLogPayload: DeleteLogPayload;
  DeleteMigrationPayload: DeleteMigrationPayload;
  DeleteTaskStatPayload: DeleteTaskStatPayload;
  DeleteTaskPayload: DeleteTaskPayload;
  ExecuteTaskPayload: ExecuteTaskPayload;
  IncTaskStatPayload: IncTaskStatPayload;
  ProcessNextTaskPayload: ProcessNextTaskPayload;
  ProcessNextTaskRecord: ProcessNextTaskRecord;
  UpdateExecutionStatusPayload: UpdateExecutionStatusPayload;
  UpdateStatsPayload: UpdateStatsPayload;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "Node"
  | "ExecutionsConnection"
  | "Execution"
  | "Task"
  | "TasksConnection"
  | "TasksEdge"
  | "PageInfo"
  | "TaskStatsConnection"
  | "TaskStat"
  | "TaskStatsEdge"
  | "LogsConnection"
  | "Log"
  | "LogsEdge"
  | "ExecutionsEdge"
  | "MigrationsConnection"
  | "Migration"
  | "MigrationsEdge"
  | "CreateExecutionPayload"
  | "CreateLogPayload"
  | "CreateMigrationPayload"
  | "CreateTaskStatPayload"
  | "CreateTaskPayload"
  | "UpdateExecutionPayload"
  | "UpdateLogPayload"
  | "UpdateMigrationPayload"
  | "UpdateTaskStatPayload"
  | "UpdateTaskPayload"
  | "DeleteExecutionPayload"
  | "DeleteLogPayload"
  | "DeleteMigrationPayload"
  | "DeleteTaskStatPayload"
  | "DeleteTaskPayload"
  | "ExecuteTaskPayload"
  | "IncTaskStatPayload"
  | "ProcessNextTaskPayload"
  | "ProcessNextTaskRecord"
  | "UpdateExecutionStatusPayload"
  | "UpdateStatsPayload";

/**
 * An object with a globally unique `ID`.
 */
export interface Node {
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: ScalarsEnums["ID"];
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  ExecutionsOrderBy: ExecutionsOrderBy | undefined;
  TasksOrderBy: TasksOrderBy | undefined;
  TaskStatsOrderBy: TaskStatsOrderBy | undefined;
  LogsOrderBy: LogsOrderBy | undefined;
  MigrationsOrderBy: MigrationsOrderBy | undefined;
}
