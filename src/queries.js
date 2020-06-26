const sql = require("sql-template-strings");

const listen = () => sql`
    LISTEN "taskq:failure"; 
    LISTEN "taskq:success"; 
    LISTEN "taskq:running";
    LISTEN "taskq:pending";
`;

const selectNextTask = ({ maxAttempts, backoffDelay, backoffDecay }) => sql`
    SELECT *
    FROM taskq.tasks_extended
    WHERE status != 'success'
        AND locked = false
        AND attempts < ${maxAttempts}
        AND execute_at < now()
        AND (
            last_executed IS NULL
            OR CASE WHEN ${backoffDecay} = 'exponential'
            THEN
                last_executed + (${backoffDelay}::interval * attempts * attempts) < now()
            ELSE
                last_executed + (${backoffDelay}::interval * attempts) < now()
            END
        )
    ORDER BY execute_at
    LIMIT 1 FOR
    UPDATE SKIP LOCKED;
`;

const insertTaskToExecuteAtDateTime = ({
  name,
  params,
  executeAtDateTime,
  parentId,
}) => sql`
    INSERT INTO taskq.tasks (name, params, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${parentId}, ${executeAtDateTime})
    ON CONFLICT ON CONSTRAINT tasks_name_execute_at_key 
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const insertTaskToExecuteIn = ({ name, params, executeIn, parentId }) => sql`
    INSERT INTO taskq.tasks (name, params, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${parentId}, now() + ${executeIn}::interval)
    ON CONFLICT ON CONSTRAINT tasks_name_execute_at_key
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const insertTaskToExecuteTodayAt = ({
  name,
  params,
  executeTodayAt,
  parentId,
}) => sql`
    INSERT INTO taskq.tasks (name, params, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${parentId}, current_date + ${executeTodayAt}::time)
    ON CONFLICT ON CONSTRAINT tasks_name_execute_at_key
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const insertTaskToExecuteInSumOf = ({
  name,
  params,
  parentId,
  executeInSumOf: { datetime, interval },
}) => sql`
    INSERT INTO taskq.tasks (name, params, parent_id, execute_at) 
    VALUES (${name}, ${params}, ${parentId}, ${datetime}::timestamp with time zone + ${interval}::interval)
    ON CONFLICT ON CONSTRAINT tasks_name_execute_at_key
    DO UPDATE SET params = EXCLUDED.params, parent_id = EXCLUDED.parent_id
    RETURNING *;
`;

const insertExecution = ({ taskId }) => sql`
    INSERT INTO taskq.executions (task_id)
    VALUES (${taskId})
    RETURNING id
`;

const updateExecutionSuccess = ({ id }) => sql`
    WITH updated AS (
        UPDATE taskq.executions
        SET status = 'success'
        WHERE id = ${id}
        RETURNING task_id
    )
    UPDATE taskq.tasks
    SET locked = true
    WHERE id = ( SELECT task_id FROM updated);
`;

const updateExecutionFailure = ({ id, maxAttempts }) => sql`
    WITH updated AS (
        UPDATE taskq.executions
        SET status = 'failure'
        WHERE id = ${id}
        RETURNING task_id
    )
    UPDATE taskq.tasks
    SET locked = true
    WHERE id = ( SELECT task_id FROM updated) 
    AND ( SELECT attempts FROM taskq.tasks_extended WHERE id = ( SELECT task_id FROM updated) ) >= ${maxAttempts};
`;

const appendLog = ({ executionId, message }) => sql`
    UPDATE taskq.executions
    SET logs = CONCAT(logs, ${message}::text)
    WHERE id = ${executionId}
`;

module.exports = {
  listen,
  selectNextTask,
  insertTaskToExecuteAtDateTime,
  insertTaskToExecuteTodayAt,
  insertTaskToExecuteIn,
  insertTaskToExecuteInSumOf,
  insertExecution,
  updateExecutionSuccess,
  updateExecutionFailure,
  appendLog,
};
