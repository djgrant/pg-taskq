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
    task_id integer NOT NULL REFERENCES tasks(id),
    status character varying NOT NULL DEFAULT 'running',
    started_at timestamp with time zone DEFAULT now()
);

CREATE TABLE logs (
    id serial PRIMARY KEY,
    execution_id integer NOT NULL REFERENCES executions(id),
    time timestamp with time zone DEFAULT now(),
    message jsonb
);

CREATE VIEW tasks_extended AS
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
		                FROM tasks
                		WHERE id = t.id
                		AND execute_at > now()
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
        SELECT count(*)::int
        FROM executions e
        WHERE e.task_id = t.id
    ) AS attempts
FROM tasks t
ORDER BY t.id;


--- INDXES ---

CREATE INDEX on executions (task_id, started_at DESC);
CREATE INDEX on tasks (id, execute_at DESC, parent_id);
CREATE INDEX on logs (execution_id, time);


--- FUNCTIONS --

CREATE FUNCTION descendant_tasks(parent_id int) RETURNS setof tasks_extended 
AS $$
	WITH RECURSIVE child_tasks AS (
		SELECT * FROM tasks_extended 
			WHERE CASE WHEN $1 IS NULL 
			THEN 
				parent_id IS NULL 
			ELSE 
				parent_id = $1 
			END
		UNION ALL
		SELECT t.* FROM tasks_extended t, child_tasks c WHERE t.parent_id = c.id
	) 
	SELECT * FROM child_tasks;
$$ 
LANGUAGE SQL IMMUTABLE;

CREATE FUNCTION descendant_task_counts(parent_id int) RETURNS TABLE (
	total bigint, 
    scheduled bigint, 
    pending bigint, 
    running bigint, 
    failure bigint, 
    timeout bigint, 
    success bigint
) 
AS $$
	WITH child_tasks AS (
		SELECT * FROM descendant_tasks($1)
	)
	SELECT
		(SELECT count(*) FROM child_tasks),
		(SELECT count(*) FROM child_tasks WHERE status = 'scheduled'),
		(SELECT count(*) FROM child_tasks WHERE status = 'pending'),
		(SELECT count(*) FROM child_tasks WHERE status = 'running'),
		(SELECT count(*) FROM child_tasks WHERE status = 'failure'),
		(SELECT count(*) FROM child_tasks WHERE status = 'timeout'),
		(SELECT count(*) FROM child_tasks WHERE status = 'success');
$$ 
LANGUAGE SQL IMMUTABLE;


--- FUNCTIONS (TRIGGERS) --

CREATE FUNCTION on_task_event () RETURNS TRIGGER AS $$ 
DECLARE
    event varchar := TG_ARGV[0];
    task text := (
        SELECT row_to_json(t) FROM (
            SELECT * FROM tasks_extended WHERE id = NEW.id
        ) t
    );
BEGIN 
    PERFORM pg_notify(CONCAT('taskq:', event), task);
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE FUNCTION on_task_status_change () RETURNS TRIGGER AS $$ 
DECLARE
    event varchar := NEW.status;
    task text := (
        SELECT row_to_json(t) FROM (
            SELECT *, NEW.id as execution_id FROM tasks_extended WHERE id = NEW.task_id
        ) t
    );
BEGIN 
    PERFORM pg_notify(CONCAT('taskq:', event), task);
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


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

