create table tasks (
	id serial primary key,
	parent_id integer references tasks(id) on delete cascade,
	name text not null,
	params jsonb,
	context jsonb,
	execute_at timestamptz not null default now(),
	locked boolean default false not null,
	status varchar not null,
	attempts integer default 0 not null,
	children_stats jsonb default null,
	descendants_stats jsonb default null,
	constraint tasks_unique_key unique (name, parent_id, params, context, execute_at)
);

create table executions (
	id serial primary key,
	task_id integer not null references tasks(id) on delete cascade,
	status varchar default 'running',
	started_at timestamptz default now(),
	finished_at timestamptz
);

create table logs (
	id serial primary key,
	execution_id integer not null references executions(id) on delete cascade,
	time timestamptz default now(),
	message jsonb
);


--- indexes ---

create index on executions (task_id, started_at desc);
create index on tasks (id, parent_id);
create index on tasks (execute_at desc);
create index on tasks (execute_at asc);
create index on tasks (status);
create index on logs (execution_id, time);


-- default task status --

create function on_before_task_insert() returns trigger as $$
begin
	if new.execute_at > now() then
		new.status = 'scheduled';
	else
		new.status = 'pending';
	end if;
	return new;
end
$$ language plpgsql volatile;

create trigger before_task_inserted before insert on tasks
for each row execute procedure on_before_task_insert();


-- computed task status/attempts --

create function on_execution_status_change() returns trigger as $$
declare
	task tasks;
	latest_execution executions;
	attempts integer;
begin
	select * into task 
	from tasks 
	where id = new.task_id;

	select count(*) into attempts
	from executions e
	where e.task_id = task.id;

	latest_execution = tasks_latest_execution(task);
	task.attempts = attempts;
	task.status = latest_execution.status;
 
	update tasks 
	set status = task.status, attempts = task.attempts
	where id = task.id;
		
	return new;
end
$$ language plpgsql volatile;


create trigger execution_inserted 
	after insert on executions
	for each row execute procedure on_execution_status_change();

create trigger execution_updated 
	after update on executions
	for each row when (old.status is distinct from new.status)
	execute procedure on_execution_status_change();


-- computed task stats --

create function on_task_change () returns trigger as $$ 
declare
	old_status varchar; -- pg version < 12 cannot read old.status
	locked boolean;
begin 
	case 
		when TG_ARGV[0] = 'locked' then
			locked = true;
		when TG_ARGV[0] = 'unlocked' then
			locked = false;
		else
			locked = null;
	end case;
	
	case
		when TG_OP = 'INSERT' then
			old_status = null;
		when TG_OP = 'UPDATE' then
			old_status = old.status;
	end case;

	perform update_parent_task_children_stats(new.parent_id, new.status, old_status, locked);
 	perform update_ancestor_tasks_descendants_stats(new.parent_id, new.status, old_status, locked);

	return new;
end
$$ language plpgsql volatile;


create function update_parent_task_children_stats (
	parent_task_id integer, 
	new_status varchar, 
	old_status varchar,
	locked boolean
) 
returns void as $$
declare
	parent_task tasks;
	children_stats_updated jsonb;
begin
	select * into parent_task 
	from tasks 
	where id = parent_task_id;

	if (parent_task.id is not null) then
		children_stats_updated = update_stats(
			parent_task.children_stats, 
			new_status, 
			old_status,
			locked
		);

		update tasks 
		set children_stats = children_stats_updated 
		where id = parent_task.id;
	end if;
end
$$ language plpgsql volatile;


create function update_ancestor_tasks_descendants_stats (
	parent_task_id integer, 
	new_status varchar, 
	old_status varchar,
	locked boolean
) 
returns void as $$
declare
	parent_task tasks;
	descendants_stats_updated jsonb;
begin
	select * into parent_task 
	from tasks 
	where id = parent_task_id;
	
	if (parent_task.id is not null) then
		descendants_stats_updated = update_stats(
			parent_task.descendants_stats, 
			new_status, 
			old_status,
			locked
		);
		
		update tasks 
		set descendants_stats = descendants_stats_updated
		where id = parent_task.id;
		
		-- recurse to next level up
		perform update_ancestor_tasks_descendants_stats(
			parent_task.parent_id, 
			new_status, 
			old_status,
			locked
		);
	end if;
end
$$ language plpgsql volatile;


create trigger task_inserted 
	after insert on tasks
	for each row execute procedure on_task_change();

create trigger task_status_updated 
	after update on tasks
	for each row when (old.status is distinct from new.status) 
	execute procedure on_task_change();

create trigger task_locked
	after update on tasks
	for each row when (old.locked = false and new.locked = true)
	execute procedure on_task_change('locked');

create trigger task_unlocked
	after update on tasks
	for each row when (old.locked = true and new.locked = false)
	execute procedure on_task_change('unlocked');

-- search functions --

create function descendant_tasks(task_id int) returns setof tasks as $$
	with recursive child_tasks as (
		select * from tasks
			where case when $1 is null 
			then 
				parent_id is null 
			else 
				parent_id = $1 
			end
		union all
		select t.* from tasks t, child_tasks c where t.parent_id = c.id
	) 
	select * from child_tasks;
$$ language sql stable;

comment on function descendant_tasks(int) is e'@sortable\n@filterable';


create function child_tasks(task_id int) returns setof tasks as $$
	select * from tasks
	where case when $1 is null 
	then 
		parent_id is null 
	else 
		parent_id = $1 
	end
$$ language sql stable;

comment on function child_tasks(int) is e'@sortable\n@filterable';


create function root_descendants_stats() returns jsonb as $$
	select jsonb_build_object( 
		'success', (select count(*) from tasks where status = 'success'),
		'failure', (select count(*) from tasks where status = 'failure'),
		'timeout', (select count(*) from tasks where status = 'timeout'),
		'running', (select count(*) from tasks where status = 'running'),
		'pending', (select count(*) from tasks where status = 'pending'),
		'scheduled', (select count(*) from tasks where status = 'scheduled'),
		'total', (select count(*) from tasks)
	);
$$ language sql stable;


create function root_children_stats() returns jsonb as $$
	select jsonb_build_object( 
		'success', (select count(*) from tasks where status = 'success' and parent_id is null),
		'failure', (select count(*) from tasks where status = 'failure' and parent_id is null),
		'timeout', (select count(*) from tasks where status = 'timeout' and parent_id is null),
		'running', (select count(*) from tasks where status = 'running' and parent_id is null),
		'pending', (select count(*) from tasks where status = 'pending' and parent_id is null),
		'scheduled', (select count(*) from tasks where status = 'scheduled' and parent_id is null),
		'total', (select count(*) from tasks where parent_id is null)
	);
$$ language sql stable;


-- table functions --

create function tasks_last_executed(t tasks) returns timestamptz as $$
	select e.started_at
	from executions e
	where e.task_id = t.id
	order by e.started_at desc
	limit 1;
$$ language sql stable;

comment on function tasks_last_executed(tasks) is '@sortable';


create function tasks_latest_execution (t tasks) returns executions as $$
declare
	latest_execution executions;
begin
	select * into latest_execution
	from executions e
	where e.task_id = t.id 
	order by e.started_at desc, e.id desc limit 1;
	
	return latest_execution;
end 
$$ language plpgsql stable;


create function tasks_descendant_tasks(t tasks) returns setof tasks as $$
	select * from descendant_tasks(t.id)
$$ 
language sql stable;


create function executions_duration(e executions) returns varchar as $$
	select to_char(coalesce(e.finished_at, now()) - e.started_at, 'HH24:MI:SS:MS');
$$ 
language sql stable;


-- mutation functions --

create function update_execution_status(
	new_status varchar, 
	execution_id integer, 
	task_id integer, 
	max_attempts integer
) 
returns executions as $$
declare
	updated_execution executions;
	current_attempts integer;
begin
	update executions into updated_execution
	set status = new_status, finished_at = now()
	where id = execution_id
	returning *;

	select attempts into current_attempts from tasks where id = task_id;

	-- it's important to run this query sequentially (e.g. not in a CTE)
	-- otherwise the locked event will trigger before the status_change event
	if (current_attempts >= max_attempts or updated_execution.status = 'success') then
		update tasks
		set locked = true
		where id = task_id;
	end if;

	return updated_execution;
end
$$ language plpgsql volatile;


-- process task queue --

create function process_next_task(
	backoff_decay varchar,
	backoff_delay interval,
	concurrent_executions integer,
	max_attempts integer
) 
returns table(
	execution_id integer, 
	task_name text
) as $$
declare
	next_task tasks;
begin
	select * into next_task 
	from tasks t
	where (select count(*) from tasks where status = 'running') < concurrent_executions
	and t.status != 'running'
	and t.status != 'scheduled'
	and t.status != 'success'
	and t.locked = false 
	and t.attempts < max_attempts
	and (
		tasks_last_executed(t) is null
		or case when backoff_decay = 'exponential'
		then
			tasks_last_executed(t) + (backoff_delay * t.attempts * t.attempts) < now()
		else
			tasks_last_executed(t) + (backoff_delay * t.attempts) < now()
		end
	)
	order by t.execute_at asc
	limit 1
	for update skip locked;

	if next_task is null then 
		return;
	end if;
	
	return query 
		insert into executions (task_id) 
		values (next_task.id) 
		returning 
			id as execution_id, 
			next_task.name as task_name;
end
$$ language plpgsql volatile;


-- task events --

create function dispatch_task_event () returns trigger as $$
declare
	event_type varchar := tg_argv[0];
	payload jsonb;
begin
	payload = jsonb_build_object(
		'event', event_type,
		'task', row_to_json(new), 
		'execution', row_to_json(tasks_latest_execution(new))
	);
	perform pg_notify('taskq', payload::text);
	return new;
end
$$ language plpgsql volatile;


create trigger task_event_1_inserted
	after insert on tasks
	for each row execute procedure dispatch_task_event('status_change');

create trigger task_event_2_updated
	after update on tasks
	for each row when (old.status is distinct from new.status) 
	execute procedure dispatch_task_event('status_change');

create trigger task_event_3_locked
	after update on tasks
	for each row when (old.locked = false and new.locked = true)
	execute procedure dispatch_task_event('locked');

create trigger task_event_4_completed
	after update on tasks
	for each row when (
		(old.descendants_stats ->> 'locked')::numeric != (old.descendants_stats ->> 'total')::numeric and
		(new.descendants_stats ->> 'locked')::numeric = (new.descendants_stats ->> 'total')::numeric
	)
	execute procedure dispatch_task_event('complete'); 


-- utility functions --

create function update_stat (stats jsonb, key varchar, value integer) returns jsonb as $$
begin
	return jsonb_set(
		stats::jsonb, 
		Array[key],
		((stats ->> key)::integer + value)::text::jsonb
	);
end
$$ language plpgsql stable;


create function update_stats (
	stats jsonb, 
	new_status varchar, 
	old_status varchar, 
	locked boolean
) 
returns jsonb as $$
declare
	base_stats jsonb := '{
	"pending": 0, 
	"failure": 0, 
	"success": 0, 
	"timeout": 0, 
	"scheduled": 0, 
	"running": 0,
	"locked": 0,
	"total": 0
	}'::jsonb;
begin
	stats = coalesce(stats, base_stats);

	if (locked = true) then
		return update_stat(stats, 'locked', 1);
	end if; 

	if (locked = false) then
		return update_stat(stats, 'locked', -1);
	end if; 
	
	if (old_status is null) then
	stats = update_stat(stats, 'total', 1);
	else
		stats = update_stat(stats, old_status, -1);
	end if;

	return update_stat(stats, new_status, 1);
end
$$ language plpgsql stable;