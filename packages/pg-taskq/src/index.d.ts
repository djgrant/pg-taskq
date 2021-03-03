declare module "@djgrant/pg-taskq" {
  import * as pg from "pg";

  class PgTaskQ<Deps> {
    constructor(opts: Options<Deps>);
    start(): void;
    stop(): void;
    take(taskName: string | string[], cb?: OnExecute<Deps>): Take<Deps>;
    handler<Result, Params = any, Context = any>(
      cb: (ops: ExecuteParams<Deps, Params, Context>) => Result
    ): (opts: ExecuteParams<Deps, Params, Context>) => Result;
    enqueue(name: string, params?: {}): Promise<void>;
    enqueue(opts: {
      name: string;
      params?: {};
      context?: {};
      priority?: number;
    }): Promise<void>;
    schedule(opts: {
      name: string;
      params?: {};
      context?: {};
      executeIn: string;
      priority?: number;
    }): Promise<void>;
    schedule(opts: {
      name: string;
      params?: {};
      context?: {};
      executeTodayAt: string;
      priority?: number;
    }): Promise<void>;
    schedule(opts: {
      name: string;
      params?: {};
      context?: {};
      executeAtDateTime: Date;
      priority?: number;
    }): Promise<void>;
    scheduleAgain(
      taskName: Task,
      opts: {
        add: string;
      }
    ): Promise<void>;
    debug(
      name: string,
      opts: {
        params: any;
        context: any;
      }
    ): void;
    debug(opts: { name: string; params: any; context: any }): void;
  }
  interface Take<Deps> {
    onFirstAttempt(cb: OnExecute<Deps>): Take<Deps>;
    onExecute(cb: OnExecute<Deps>): Take<Deps>;
    onFailure(cb: OnExecute<Deps>): Take<Deps>;
    onTimeout(cb: OnExecute<Deps>): Take<Deps>;
    onSuccess(cb: OnExecute<Deps>): Take<Deps>;
    onComplete(cb: OnExecute<Deps>): Take<Deps>;
    onBeforeComplete(cb: OnExecute<Deps>): Take<Deps>;
  }

  interface Options<Deps> {
    db: pg.ConnectionConfig;
    schema: string;
    logLevel: LogLevels;
    concurrency: number;
    maxAttempts: number;
    backoffDelay: string;
    backoffDecay: string;
    processQueueEvery: number;
    timeout: string;
    dependencies: (opts: ExecuteParams<{}>) => Promise<Deps>;
  }
  type LogFn = (...args: any[]) => void;
  interface Task {
    id: number;
    name: string;
    locked: boolean;
    status: string;
    attempts: number;
    execute_at: string;
    priority: number;
  }
  interface Execution {
    task_id: number;
    started_at: string;
    finished_at: string;
  }

  interface Stat {
    total: number;
    locked: number;
    failure: number;
    pending: number;
    running: number;
    success: number;
    timeout: number;
    scheduled: number;
  }

  interface Stats {
    children: Stat;
    descendants: Stat;
  }

  type ExecuteParams<Deps, Params = any, Context = any> = Deps & {
    taskq: PgTaskQ<Deps>;
    log: LogFn;
    context: Context;
    params: Params;
    task: Task;
    execution: Execution;
    priority: number;
    getStats: () => Promise<Stats>;
    getParent: () => Promise<ExecuteParams<Deps, Params, Context>>;
    updateContext: <Patch>(patch: Patch) => Promise<Context & Patch>;
    enqueueCopy: (opts: {
      params?: {};
      context?: {};
      priority?: number;
    }) => Promise<void>;
  };

  // todo: type safe execution params
  type OnExecute<Deps> = (opts: ExecuteParams<Deps>) => void | Promise<void>;
  type LogLevels = "silly" | "debug" | "info" | "warn" | "error" | "critcal";
}
