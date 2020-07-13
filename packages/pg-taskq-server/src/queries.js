const sql = require("sql-template-strings");

const selectTask = ({ id }) => sql`SELECT * FROM tasks WHERE id = ${id}`;

const selectLatestExecution = ({ taskId }) => sql`
  SELECT e.*, e.id as execution_id, t.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS child_tasks 
  FROM executions e, tasks_extended t
  WHERE e.task_id = ${taskId} 
  AND t.id = e.task_id 
  ORDER BY started_at DESC
  LIMIT 1
`;

const selectExecution = ({ executionId }) => sql`
  SELECT e.*, e.id as execution_id, t.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS child_tasks 
  FROM executions e, tasks_extended t
  WHERE e.id = ${executionId}
  AND t.id = e.task_id 
  LIMIT 1
`;

const selectRootTasks = ({ lastItem = 0 } = {}) => sql`
  SELECT t.id, t.name, t.execute_at, t.status, t.attempts, t.parent_id, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS child_tasks
  FROM tasks_extended t 
  WHERE parent_id IS NULL
  AND id > ${lastItem}
  ORDER BY execute_at DESC
  LIMIT 500
`;

const selectChildTasks = ({ id, lastItem = 0 }) => sql`
  SELECT t.id, t.name, t.execute_at, t.status, t.attempts, t.parent_id, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS child_tasks 
  FROM tasks_extended t 
  WHERE parent_id = ${id}
  AND id > ${lastItem}
  ORDER BY execute_at DESC 
  LIMIT 500
`;

const rerunTask = ({ taskId }) => sql`
  INSERT INTO executions (task_id) VALUES (${taskId}) RETURNING id;
`;

module.exports = {
  selectExecution,
  selectLatestExecution,
  selectRootTasks,
  selectChildTasks,
  selectTask,
  rerunTask,
};
