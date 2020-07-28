const sql = require("sql-template-strings");

const selectTask = ({ id }) => sql`
  SELECT * FROM tasks WHERE id = ${id}
`;

const selectLatestExecution = ({ taskId }) => sql`
  SELECT t.*, t.id as task_id, e.*, (
    SELECT count(*)::int
    FROM tasks tt
    WHERE t.id = tt.parent_id
  ) AS child_tasks 
  FROM executions e, extended_tasks t
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
  FROM executions e, extended_tasks t
  WHERE e.id = ${executionId}
  AND t.id = e.task_id 
  LIMIT 1
`;

const selectLogs = ({ executionId }) => sql`
  SELECT time, message 
  FROM logs
  WHERE execution_id = ${executionId}
`;

const selectTasks = ({ parentId, status, lastItem = 0 }) => {
  const query = sql`
    SELECT t.id, t.name, t.execute_at, t.status, t.attempts, t.parent_id, (
      SELECT count(*)::int
      FROM tasks tt
      WHERE t.id = tt.parent_id
    ) AS child_tasks
    FROM extended_tasks t 
    WHERE id > ${lastItem}   
  `;

  if (parentId) {
    query.append(sql`AND parent_id = ${parentId} `);
  }

  if (parentId === null) {
    query.append(sql`AND parent_id IS NULL `);
  }

  if (status) {
    if (status.startsWith("!")) {
      query.append(sql`AND status != ${status.slice(1)} `);
    } else {
      query.append(sql`AND status = ${status} `);
    }
  }

  return query.append(sql`ORDER BY execute_at DESC LIMIT 100`);
};

const selectCounts = ({ parentId }) => sql`
  SELECT * FROM descendant_task_counts(${parentId})
`;

const rerunTask = ({ taskId }) => sql`
  INSERT INTO executions (task_id) VALUES (${taskId}) RETURNING id;
`;

module.exports = {
  selectExecution,
  selectLatestExecution,
  selectLogs,
  selectTasks,
  selectTask,
  selectCounts,
  rerunTask,
};
