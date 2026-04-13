# pg-taskq

`pg-taskq` is a PostgreSQL-backed task queue for Node.js that models work as a reactive tree of tasks. 

## How it works

Tasks can enqueue child tasks by calling `taskq.enqueue()` at runtime inside of a handler. 

Enqueued tasks are tracked in table representing the task tree. 

When all children of a task node finish, a Postgres trigger is fired and emitted to the task's `onComplete` handler. This fires exactly once, after the last descendant settles.

This makes `pg-taskq` well suited for multi-stage pipelines, fan-out workloads, and any job where completion has a precise, hierarchical definition. 


## Packages

### `@djgrant/pg-taskq`

The core task queue engine. Instantiate `PgTaskQ` with a database connection and configuration, register handlers with `.take()`, then call `.start()` to begin processing.

```js
const { PgTaskQ } = require("@djgrant/pg-taskq");

const taskq = new PgTaskQ({
  db: { connectionString: process.env.DATABASE_URL },
  schema: "taskq",
  maxAttempts: 3,
  backoffDelay: "30 seconds",
  backoffDecay: "exponential",
  timeout: "5 minutes",
  concurrency: 2,
});

taskq
  .take("send-email")
  .onExecute(async ({ params, log }) => {
    await sendEmail(params.to, params.subject);
    log("Email sent");
  })
  .onFailure(({ task }) => {
    console.error(`Task ${task.id} failed after ${task.attempts} attempts`);
  });

taskq.start();
```

### `@djgrant/pg-taskq-graphql`

A PostGraphile middleware that exposes the task queue tables and derived fields over GraphQL. Mount it in an Express app to get a GraphQL API and GraphiQL IDE over your task queue state.

```ts
import { createPgTaskqGraphql } from "@djgrant/pg-taskq-graphql";

app.use(createPgTaskqGraphql({ db: pool, schema: "taskq" }));
```

---

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `db` | `pg.ConnectionConfig` | — | Postgres connection config |
| `schema` | `string` | — | Postgres schema for task tables |
| `concurrency` | `number` | `1` | Max concurrent executions |
| `maxAttempts` | `number` | `1` | Max retry attempts per task |
| `backoffDelay` | `string` | `"20 seconds"` | Initial delay between retries |
| `backoffDecay` | `string` | `"exponential"` | Backoff strategy (`exponential` or `linear`) |
| `timeout` | `string` | `"5 minutes"` | Execution timeout per task |
| `processQueueEvery` | `number` | `100` | Polling interval in milliseconds |
| `logLevel` | `string` | `"warn"` | Log verbosity (`silly`, `debug`, `info`, `warn`, `error`) |
| `dependencies` | `function` | `{}` | Async factory that injects dependencies into handler params |

---

## Enqueueing and Scheduling Tasks

`enqueue` inserts a task for immediate execution. `schedule` inserts a task to run at a future time, accepting three mutually exclusive timing parameters.

```js
// Immediate
await taskq.enqueue("send-email", { to: "user@example.com" });

// Delay from now
await taskq.schedule({ name: "send-report", executeIn: "1 hour" });

// Specific datetime
await taskq.schedule({ name: "send-report", executeAtDateTime: new Date("2026-05-01T09:00:00Z") });

// Time offset from start of today
await taskq.schedule({ name: "daily-digest", executeTodayAt: "08:00:00" });
```

`scheduleAgain` re-inserts an existing task offset from its original `execute_at` time, which supports recurring task patterns without drift.

```js
taskq.take("daily-digest").onExecute(async ({ task, taskq }) => {
  await runDigest();
  await taskq.scheduleAgain(task, { add: "1 day" });
});
```

Tasks with identical `name`, `execute_at`, and hashed `params`/`context` are deduplicated at the database level via `ON CONFLICT DO NOTHING`.

---

## Handler Lifecycle

`.take()` returns a `Take` object with chainable lifecycle hooks. Each hook receives the full `ExecuteParams` object, which includes the task record, execution record, params, context, injected dependencies, and a set of task management methods.

| Hook | Fires when |
|---|---|
| `onFirstAttempt` | Task is executing for the first time (`attempts === 1`) |
| `onExecute` | Task begins execution on any attempt |
| `onSuccess` | Execution completes without error |
| `onFailure` | Execution throws, and attempts remain |
| `onTimeout` | Execution exceeds configured timeout |
| `onBeforeComplete` | All executions finished; task can still be mutated before completion |
| `onComplete` | Task and all descendants reach a terminal state |

`onBeforeComplete` runs before `onComplete` and allows a handler to re-schedule or mutate the task before its parent's `onComplete` fires.

---

## Execution Params

Every handler receives an `ExecuteParams` object:

| Property | Type | Description |
|---|---|---|
| `task` | `Task` | The task record |
| `execution` | `Execution` | The current execution record |
| `params` | `any` | Task input params |
| `context` | `any` | Shared mutable context object |
| `priority` | `number` | Task priority |
| `taskq` | `PgTaskQ` | Sub-scoped task queue instance bound to this task as parent |
| `log` | `LogFn` | Writes to execution log in the database |
| `getStats` | `() => Promise<Stats>` | Returns child/descendant task counts by status |
| `getParent` | `() => Promise<ExecuteParams>` | Returns parent task execution params |
| `updateContext` | `(patch) => Promise<Context>` | Merges patch into the task's context in Postgres |
| `enqueueCopy` | `(overrides) => Promise<void>` | Enqueues a copy of this task under its parent |

---

## Debugging

`taskq.debug()` runs a handler synchronously without inserting a task into the database, connecting to Postgres, or triggering lifecycle events. The `taskq` instance inside the handler is replaced with a no-op proxy that logs all calls.

```js
taskq.debug("send-email", {
  params: { to: "test@example.com" },
  context: {},
});
```

---

## Stopping

`taskq.stop()` cancels any running tasks in Postgres, waits for the current processing cycle to complete, releases the notification client connection, and closes the connection pool.
