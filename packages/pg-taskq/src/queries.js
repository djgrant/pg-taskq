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

const insertTaskToExecuteAtDateTime = ({
  name,
  executeAtDateTime,
  parentId,
  params = {},
  context = {},
  priority = 0,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at, priority) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${executeAtDateTime}, ${priority})
    ON CONFLICT ON CONSTRAINT tasks_unique_key DO NOTHING
    RETURNING *;
`;

const insertTaskToExecuteIn = ({
  name,
  executeIn,
  parentId,
  params = {},
  context = {},
  priority = 0,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at, priority) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, now() + ${executeIn}::interval, ${priority})
    ON CONFLICT ON CONSTRAINT tasks_unique_key DO NOTHING
    RETURNING *;
`;

const insertTaskToExecuteInSumOf = ({
  name,
  parentId,
  executeInSumOf: { datetime, interval },
  params = {},
  context = {},
  priority = 0,
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at, priority) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${datetime}::timestamp with time zone + ${interval}::interval, ${priority})
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
  selectTask,
  selectStats,
  insertTaskToExecuteAtDateTime,
  insertTaskToExecuteIn,
  insertTaskToExecuteInSumOf,
  updateExecution,
  insertLogs,
};
