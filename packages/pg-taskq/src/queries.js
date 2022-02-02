const sql = require("sql-template-strings");

const listen = () => sql`
    LISTEN "taskq";
`;

const processNextTask = ({
  backoffDecay,
  backoffDelay,
  concurrentExecutions,
  maxAttempts,
}) => sql`
  SELECT * 
  FROM process_next_task(
    ${backoffDecay}, 
    ${backoffDelay}, 
    ${concurrentExecutions}, 
    ${maxAttempts}
  );
`;

const selectTask = ({ taskId }) => sql`
  SELECT *
  FROM tasks
  WHERE id = ${taskId};
`;

const selectTimedOutExecutions = ({ timeout }) => sql`
  SELECT * 
  FROM executions
  WHERE status = 'running'
  AND now() > started_at + ${timeout};
`;

const selectStats = ({ taskId }) => sql`
  SELECT 
    tasks_children_stats(tasks) as children, 
    tasks_descendants_stats(tasks) as descendants
  FROM tasks
  WHERE id = ${taskId};
`;

const selectTaskCompleteStatus = ({ taskId }) => sql`
  SELECT 
    tasks_complete(tasks) as complete
  FROM tasks
  WHERE id = ${taskId};
`;

const insertTaskToExecuteAtDateTime = ({
  name,
  executeAtDateTime,
  parentId,
  params = {},
  context = {},
  priority = 0,
  status = null,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at, status, priority) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${executeAtDateTime}, ${status}, ${priority})
    ON CONFLICT (name, execute_at, md5(params::text), md5(context::text)) DO NOTHING
    RETURNING *;
`;

const insertTaskToExecuteIn = ({
  name,
  executeIn,
  parentId,
  params = {},
  context = {},
  priority = 0,
  status = null,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at, status, priority) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, now() + ${executeIn}::interval, ${status}, ${priority})
    ON CONFLICT (name, execute_at, md5(params::text), md5(context::text)) DO NOTHING
    RETURNING *;
`;

const insertTaskToExecuteInSumOf = ({
  name,
  parentId,
  executeInSumOf: { datetime, interval },
  params = {},
  context = {},
  priority = 0,
  status = null,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at, status, priority) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${datetime}::timestamp with time zone + ${interval}::interval, ${status}, ${priority})
    ON CONFLICT (name, execute_at, md5(params::text), md5(context::text)) DO NOTHING
    RETURNING *;
`;

const updateExecution = ({ status, executionId, taskId, maxAttempts }) => sql`
  SELECT * 
  FROM update_execution_status(
    ${status}, 
    ${executionId}, 
    ${taskId}, 
    ${maxAttempts}
  );
`;

const cancelRunningTasks = ({ maxAttempts }) => sql`
  SELECT cancel_running_tasks(${maxAttempts});
`;

const updateContext = ({ taskId, context }) => sql`
  UPDATE tasks 
  SET context = ${context}
  WHERE id = ${taskId}
  RETURNING context;
`;

const insertLogs = ({ logs }) => {
  const query = sql`INSERT INTO logs (execution_id, message) VALUES `;
  logs.forEach(({ executionId, message }, i) => {
    if (i > 0) query.append(", ");
    query.append(sql`(${executionId}, ${message})`);
  });
  return query;
};

module.exports = {
  listen,
  processNextTask,
  selectTimedOutExecutions,
  selectTask,
  selectStats,
  selectTaskCompleteStatus,
  insertTaskToExecuteAtDateTime,
  insertTaskToExecuteIn,
  insertTaskToExecuteInSumOf,
  cancelRunningTasks,
  updateExecution,
  updateContext,
  insertLogs,
};
