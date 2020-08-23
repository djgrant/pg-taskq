CREATE TABLE tasks (
    id serial PRIMARY KEY,
    parent_id integer,
    name text NOT NULL,
    params jsonb,
    context jsonb,
    execute_at timestamp with time zone NOT NULL DEFAULT now(),
    locked boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT tasks_unique_key UNIQUE (name, params, context, execute_at)
);

CREATE TABLE executions (
    id serial PRIMARY KEY,
    task_id integer NOT NULL REFERENCES tasks(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status character varying NOT NULL DEFAULT 'running',
    started_at timestamp with time zone DEFAULT now(),
    finished_at timestamp with time zone
);

CREATE TABLE logs (
    id serial PRIMARY KEY,
    execution_id integer NOT NULL REFERENCES executions(id) ON DELETE CASCADE ON UPDATE CASCADE,
    time timestamp with time zone DEFAULT now(),
    message jsonb
);


--- TYPES ---

CREATE TYPE counts AS (
    running BIGINT,
    success BIGINT,
    failure BIGINT,
    pending BIGINT,
    timeout BIGINT,
    scheduled BIGINT,
    total BIGINT
);


--- INDXES ---

CREATE INDEX on executions (task_id, started_at DESC);
CREATE INDEX on tasks (id, parent_id);
CREATE INDEX on tasks (execute_at DESC);
CREATE INDEX on tasks (execute_at ASC);
CREATE INDEX on logs (execution_id, time);


--- FUNCTIONS --

CREATE FUNCTION tasks_status(t tasks) RETURNS VARCHAR AS $$
   SELECT COALESCE(
        (
            SELECT e.status
            FROM executions e
            WHERE e.task_id = t.id
            ORDER BY e.started_at DESC
            LIMIT 1
        ),
        (
            SELECT COALESCE( 
                (
                    SELECT 'scheduled'
                    FROM tasks
                    WHERE id = t.id
                    AND execute_at > now()
                    LIMIT 1
                ), 
                'pending'
            )
        )
    )
$$ 
LANGUAGE SQL STABLE;
COMMENT ON FUNCTION tasks_status IS '@filterable';

CREATE FUNCTION tasks_last_executed(t tasks) RETURNS TIMESTAMP WITH TIME ZONE AS $$
    SELECT e.started_at
    FROM executions e
    WHERE e.task_id = t.id
    ORDER BY e.started_at DESC
    LIMIT 1 
$$ 
LANGUAGE SQL STABLE;

COMMENT ON FUNCTION tasks_last_executed IS '@sortable';

CREATE FUNCTION tasks_attempts(t tasks) RETURNS INTEGER AS $$
    SELECT count(*)::integer
    FROM executions e
    WHERE e.task_id = t.id
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION tasks_children(t tasks) RETURNS SETOF tasks AS $$ 
    SELECT * FROM tasks WHERE parent_id = t.id ORDER BY id ASC;
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION tasks_latest_execution(inputTask tasks) RETURNS executions AS $$
	SELECT e.*
	FROM executions e, tasks t
    WHERE e.task_id = inputTask.id
    AND t.id = e.task_id 
    ORDER BY started_at DESC
    LIMIT 1;
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION descendant_tasks(task_id int) RETURNS setof tasks AS $$
	WITH RECURSIVE child_tasks AS (
		SELECT * FROM tasks
			WHERE CASE WHEN $1 IS NULL 
			THEN 
				parent_id IS NULL 
			ELSE 
				parent_id = $1 
			END
		UNION ALL
		SELECT t.* FROM tasks t, child_tasks c WHERE t.parent_id = c.id
	) 
	SELECT * FROM child_tasks;
$$ 
LANGUAGE SQL STABLE;
COMMENT ON FUNCTION descendant_tasks IS E'@sortable\n@filterable';
	
CREATE FUNCTION descendant_tasks_counts(task_id int) RETURNS counts AS $$
	WITH child_tasks AS (
		SELECT *, tasks_status(d) as status FROM descendant_tasks(task_id) d
	)
	SELECT
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'running'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'success'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'failure'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'pending'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'timeout'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'scheduled'),
		(SELECT count(*) FROM child_tasks);
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION children_tasks(task_id int) RETURNS setof tasks AS $$
	SELECT * FROM tasks
	WHERE CASE WHEN $1 IS NULL 
	THEN 
		parent_id IS NULL 
	ELSE 
		parent_id = $1 
	END
$$ 
LANGUAGE SQL STABLE;
COMMENT ON FUNCTION children_tasks IS E'@sortable\n@filterable';

CREATE FUNCTION children_tasks_counts(task_id int) RETURNS counts AS $$
	WITH child_tasks AS (
		SELECT *, tasks_status(d) as status FROM children_tasks(task_id) d
	)
	SELECT
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'running'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'success'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'failure'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'pending'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'timeout'),
		(SELECT count(*) FROM child_tasks c WHERE c.status = 'scheduled'),
		(SELECT count(*) FROM child_tasks);
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION tasks_descendants(t tasks) RETURNS SETOF tasks AS $$
	SELECT * FROM descendant_tasks(t.id)
$$ 
LANGUAGE SQL stable;

CREATE FUNCTION tasks_descendant_counts(t tasks) RETURNS counts AS $$
	SELECT * FROM descendant_tasks_counts(t.id)
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION tasks_children_counts(t tasks) RETURNS counts AS $$
	SELECT * FROM children_tasks_counts(t.id)
$$ 
LANGUAGE SQL STABLE;

CREATE FUNCTION executions_duration(e executions) RETURNS INTERVAL AS $$
    SELECT (e.finished_at - e.started_at) FROM executions e
$$ 
LANGUAGE SQL STABLE;


--- VIEWS --

CREATE VIEW extended_tasks AS
    SELECT t.id,
        t.parent_id,
        t.name,
        t.params,
        t.context,
        t.execute_at,
        t.locked,
        (
            SELECT COALESCE(
                (
                    SELECT e.status
                    FROM executions e
                    WHERE e.task_id = t.id
                    ORDER BY e.started_at DESC
                    LIMIT 1
                ), 
                (
                    SELECT COALESCE(
                        (
                            SELECT 'scheduled'
                            FROM tasks tt
                            WHERE tt.id = t.id
                            AND tt.execute_at > now()
                            LIMIT 1
                        ), 
                        'pending'
                    ) 
                )
            )
        ) AS status,
        (
            SELECT e.started_at
            FROM executions e
            WHERE e.task_id = t.id
            ORDER BY e.started_at DESC
            LIMIT 1
        ) AS last_executed,
        (
            SELECT count(*)::integer AS COUNT
            FROM executions e
            WHERE e.task_id = t.id
        ) AS attempts
    FROM tasks t;



--- FUNCTIONS (TRIGGERS) --

CREATE FUNCTION on_task_event () RETURNS TRIGGER AS $$ 
DECLARE
    event varchar := TG_ARGV[0];
    task text := (
        SELECT row_to_json(t) FROM (
            SELECT * FROM extended_tasks WHERE id = NEW.id
        ) t
    );
BEGIN 
    PERFORM pg_notify(CONCAT('taskq:', event), task);
    RETURN NEW;
END;
$$ 
LANGUAGE 'plpgsql' VOLATILE;

CREATE FUNCTION on_task_status_change () RETURNS TRIGGER AS $$ 
DECLARE
    event varchar := NEW.status;
    task text := (
        SELECT row_to_json(t) FROM (
            SELECT *, NEW.id as execution_id FROM extended_tasks WHERE id = NEW.task_id
        ) t
    );
BEGIN 
    PERFORM pg_notify(CONCAT('taskq:', event), task);
    RETURN NEW;
END;
$$ 
LANGUAGE 'plpgsql' VOLATILE;


-- TRIGGERS ---

CREATE TRIGGER on_task_scheduled
AFTER INSERT ON tasks
FOR EACH ROW
WHEN (
    NEW.execute_at > now()
)
EXECUTE PROCEDURE on_task_event('scheduled');

CREATE TRIGGER on_task_enqueued
AFTER INSERT ON tasks
FOR EACH ROW
WHEN (
    NEW.execute_at <= now()
)
EXECUTE PROCEDURE on_task_event('pending');

CREATE TRIGGER on_task_no_op
AFTER UPDATE ON tasks
FOR EACH ROW 
WHEN (
    OLD.name = NEW.name AND OLD.execute_at = NEW.execute_at
) 
EXECUTE PROCEDURE on_task_event('no-op');

CREATE TRIGGER on_task_locked
AFTER UPDATE ON tasks
FOR EACH ROW 
WHEN (
    OLD.locked IS FALSE AND NEW.locked IS TRUE
) 
EXECUTE PROCEDURE on_task_event('locked');

CREATE TRIGGER on_task_status_change
AFTER UPDATE ON executions
FOR EACH ROW 
WHEN (
    OLD.status IS DISTINCT FROM NEW.status
) 
EXECUTE PROCEDURE on_task_status_change ();

CREATE TRIGGER on_task_running
AFTER INSERT ON executions
FOR EACH ROW
EXECUTE PROCEDURE on_task_status_change ();

