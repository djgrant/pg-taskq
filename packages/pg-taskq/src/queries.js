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
  select * from process_next_task(${backoffDecay}, ${backoffDelay}, ${concurrentExecutions}, ${maxAttempts});
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

const insertTaskToExecuteAtDateTime = ({
  name,
  params,
  context,
  executeAtDateTime,
  parentId,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${executeAtDateTime})
    ON CONFLICT ON CONSTRAINT tasks_unique_key DO NOTHING
    RETURNING *;
`;

const insertTaskToExecuteIn = ({
  name,
  params,
  context,
  executeIn,
  parentId,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, now() + ${executeIn}::interval)
    ON CONFLICT ON CONSTRAINT tasks_unique_key DO NOTHING
    RETURNING *;
`;

const insertTaskToExecuteInSumOf = ({
  name,
  params,
  context,
  parentId,
  executeInSumOf: { datetime, interval },
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${datetime}::timestamp with time zone + ${interval}::interval)
    ON CONFLICT ON CONSTRAINT tasks_unique_key DO NOTHING
    RETURNING *;
`;

const updateExecution = ({ status, executionId, taskId, maxAttempts }) => sql`
  select * from update_execution_status(${status}, ${executionId}, ${taskId}, ${maxAttempts});
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
  selectStats,
  insertTaskToExecuteAtDateTime,
  insertTaskToExecuteIn,
  insertTaskToExecuteInSumOf,
  updateExecution,
  insertLogs,
};
