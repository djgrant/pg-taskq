CREATE SCHEMA taskq;

CREATE TABLE taskq.tasks (
    id serial PRIMARY KEY,
    parent_id text,
    name text NOT NULL,
    params json NOT NULL,
    scheduled_for timestamp with time zone NOT NULL,
    locked boolean NOT NULL DEFAULT FALSE,
    repeat_every interval,
    CONSTRAINT tasks_name_scheduled_for_key UNIQUE (name, scheduled_for)
);

CREATE TABLE taskq.executions (
    id serial PRIMARY KEY,
    task_id integer NOT NULL,
    logs text,
    status character varying NOT NULL DEFAULT 'running'::character varying,
    started_at timestamp with time zone DEFAULT now()
);

CREATE VIEW taskq.tasks_extended AS
SELECT t.id,
    t.parent_id,
    t.name,
    t.params,
    t.scheduled_for,
    t.repeat_every,
    t.locked,
    (
        SELECT COALESCE(
                (
                    SELECT e.status
                    FROM taskq.executions e
                    WHERE e.task_id = t.id
                    ORDER BY e.started_at DESC
                    LIMIT 1
                ), 'pending'::character varying
            ) AS status
    ) AS status,
    (
	    SELECT e.started_at
	    FROM taskq.executions e
	    WHERE e.task_id = t.id
	    ORDER BY e.started_at DESC
	    LIMIT 1
    ) AS last_executed,
    (
        SELECT count(*) AS count
        FROM taskq.executions e
        WHERE e.task_id = t.id
    ) AS attempts
FROM taskq.tasks t
ORDER BY t.id;

CREATE OR REPLACE FUNCTION taskq.on_task_status_change () RETURNS TRIGGER AS $$ 
DECLARE
    status varchar(10) := NEW.status;
    task text := (
        SELECT row_to_json(t) FROM (
            SELECT * FROM taskq.tasks_extended WHERE id = NEW.task_id
        ) t
    );
BEGIN 
    PERFORM pg_notify(CONCAT('taskq:', status), task);
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER on_task_status_change
AFTER UPDATE ON taskq.executions
FOR EACH ROW 
WHEN (
    OLD.status IS DISTINCT FROM NEW.status
) 
EXECUTE PROCEDURE taskq.on_task_status_change ();
