const sql = require("sql-template-strings");

const listen = () => sql`
    LISTEN "taskq:scheduled";
    LISTEN "taskq:pending";
    LISTEN "taskq:running";
    LISTEN "taskq:failure"; 
    LISTEN "taskq:success"; 
    LISTEN "taskq:timeout";
    LISTEN "taskq:locked";
    LISTEN "taskq:no-op";
`;

const processNextTask = ({
  backoffDelay,
  backoffDecay,
  concurrentExecutions,
  maxAttempts
}) => sql`
    WITH next_task AS (
        SELECT id, name
        FROM extended_tasks
        WHERE (SELECT count(*) FROM extended_tasks WHERE status = 'running') < ${concurrentExecutions}
        AND status != 'running'
        AND status != 'scheduled'
        AND status != 'success'
        AND locked = false 
        AND attempts < ${maxAttempts}
        AND (
            last_executed IS NULL
            OR CASE WHEN ${backoffDecay} = 'exponential'
            THEN
                last_executed + (${backoffDelay}::interval * attempts * attempts) < now()
            ELSE
                last_executed + (${backoffDelay}::interval * attempts) < now()
            END
        )
        ORDER BY execute_at ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
    )
    INSERT INTO executions (task_id)
    SELECT id FROM next_task
    RETURNING id, (SELECT name FROM next_task) as task_name;
`;

const selectTimedOutExecutions = ({ timeout }) => sql`
    SELECT id 
    FROM executions
    WHERE status = 'running'
    AND now() > started_at + ${timeout};
`;

const insertTaskToExecuteAtDateTime = ({
  name,
  params,
  context,
  executeAtDateTime,
  parentId
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${executeAtDateTime})
    ON CONFLICT ON CONSTRAINT tasks_unique_key 
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const insertTaskToExecuteIn = ({
  name,
  params,
  context,
  executeIn,
  parentId
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, now() + ${executeIn}::interval)
    ON CONFLICT ON CONSTRAINT tasks_unique_key
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const insertTaskToExecuteInSumOf = ({
  name,
  params,
  context,
  parentId,
  executeInSumOf: { datetime, interval }
}) => sql`
    INSERT INTO tasks (name, params, context, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${context}, ${parentId}, ${datetime}::timestamp with time zone + ${interval}::interval)
    ON CONFLICT ON CONSTRAINT tasks_unique_key
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const updateExecutionSuccess = ({ id }) => sql`
    WITH updated AS (
        UPDATE executions
        SET status = 'success', finished_at = now()
        WHERE id = ${id}
        RETURNING task_id
    )
    UPDATE tasks
    SET locked = true
    WHERE id = ( SELECT task_id FROM updated);
`;

const updateExecutionFailure = ({ id, maxAttempts }) => sql`
    WITH updated AS (
        UPDATE executions
        SET status = 'failure', finished_at = now()
        WHERE id = ${id}
        RETURNING task_id
    )
    UPDATE tasks
    SET locked = true
    WHERE id = ( SELECT task_id FROM updated) 
    AND ( SELECT tasks_attempts(tasks) FROM tasks WHERE id = ( SELECT task_id FROM updated) ) >= ${maxAttempts};
`;

const updateExecutionTimeout = ({ id, maxAttempts }) => sql`
    WITH updated AS (
        UPDATE executions
        SET status = 'timeout', finished_at = now()
        WHERE id = ${id}
        RETURNING task_id
    )
    UPDATE tasks
    SET locked = true
    WHERE id = ( SELECT task_id FROM updated) 
    AND ( SELECT tasks_attempts(tasks) FROM tasks WHERE id = ( SELECT task_id FROM updated) ) >= ${maxAttempts};
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
  insertTaskToExecuteAtDateTime,
  insertTaskToExecuteIn,
  insertTaskToExecuteInSumOf,
  updateExecutionSuccess,
  updateExecutionFailure,
  updateExecutionTimeout,
  insertLogs
};
