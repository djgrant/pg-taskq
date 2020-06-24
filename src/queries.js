const sql = require("sql-template-strings");

const listen = () => sql`
    LISTEN "taskq:failure"; 
    LISTEN "taskq:success"; 
    LISTEN "taskq:running";
`;

const selectNextTask = ({ maxAttempts, backoffDelay, backoffDecay }) => sql`
    SELECT *
    FROM taskq.tasks_extended
    WHERE status != 'success'
        AND locked = false
        AND attempts < ${maxAttempts}
        AND scheduled_for < now()
        AND (
            last_executed IS NULL
            OR CASE WHEN ${backoffDecay} = 'exponential'
            THEN
                last_executed + (${backoffDelay}::interval * attempts * attempts) < now()
            ELSE
                last_executed + (${backoffDelay}::interval * attempts) < now()
            END
        )
    ORDER BY scheduled_for
    LIMIT 1 FOR
    UPDATE SKIP LOCKED;
`;

const insertTask = ({ name, params, scheduledFor, parentId }) => sql`
    INSERT INTO taskq.tasks (name, params, parent_id, scheduled_for) 
    VALUES (${name}, ${params}, ${parentId}, ${scheduledFor})
    ON CONFLICT ON CONSTRAINT tasks_name_scheduled_for_key DO UPDATE set params = EXCLUDED.params
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
  insertTask,
  insertExecution,
  updateExecutionSuccess,
  updateExecutionFailure,
  appendLog,
};
