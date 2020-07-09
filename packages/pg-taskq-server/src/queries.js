const sql = require("sql-template-strings");

const selectTask = ({ id }) => sql`SELECT * FROM tasks WHERE id = ${id}`;

const selectLatestExecution = ({ taskId }) => sql`
  SELECT e.*, e.id as execution_id, t.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS children 
  FROM executions e, tasks_extended t
  WHERE e.task_id = ${taskId} 
  AND t.id = e.task_id 
  LIMIT 1
`;

const selectExecution = ({ executionId }) => sql`
  SELECT e.*, e.id as execution_id, t.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS children 
  FROM executions e, tasks_extended t
  WHERE e.id = ${executionId}
  AND t.id = e.task_id 
  LIMIT 1
`;

const selectRootTasks = () => sql`
  SELECT t.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS children 
  FROM tasks_extended t 
  WHERE parent_id IS NULL
  ORDER BY execute_at DESC 
`;

const selectChildTasks = ({ id }) => sql`
  SELECT t.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS children 
  FROM tasks_extended t 
  WHERE parent_id = ${id}
  ORDER BY execute_at DESC 
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
