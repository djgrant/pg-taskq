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
    logs text,
    status character varying NOT NULL DEFAULT 'running'::character varying,
    started_at timestamp with time zone DEFAULT now()
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
            ), 'pending'::character varying
        ) AS status
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

CREATE FUNCTION on_task_inserted () RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('taskq:pending', row_to_json(NEW)::text);
    RETURN NEW;
END
$$ LANGUAGE plpgsql VOLATILE;

CREATE FUNCTION on_task_upserted () RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('taskq:upserted', row_to_json(NEW)::text);
    RETURN NEW;
END
$$ LANGUAGE plpgsql VOLATILE;

CREATE FUNCTION on_task_status_change () RETURNS TRIGGER AS $$ 
DECLARE
    status varchar(10) := NEW.status;
    task text := (
        SELECT row_to_json(t) FROM (
            SELECT *, NEW.id as execution_id FROM tasks_extended WHERE id = NEW.task_id
        ) t
    );
BEGIN 
    PERFORM pg_notify(CONCAT('taskq:', status), task);
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER on_task_inserted
AFTER INSERT ON tasks
FOR EACH ROW
EXECUTE PROCEDURE on_task_inserted ();

CREATE TRIGGER on_task_upsert
AFTER UPDATE ON tasks
FOR EACH ROW 
WHEN (
    OLD.name = NEW.name AND OLD.execute_at = NEW.execute_at
) 
EXECUTE PROCEDURE on_task_upserted ();

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

