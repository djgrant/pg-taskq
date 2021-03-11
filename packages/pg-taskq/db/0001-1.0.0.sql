create table tasks (
	id bigserial primary key,
	parent_id bigint references tasks(id) on delete cascade,
	name text not null,
	params jsonb not null default '{}'::jsonb,
	context jsonb not null default '{}'::jsonb,
	execute_at timestamptz not null default now(),
	priority integer not null default 0,
	locked boolean not null default false,
	status varchar not null,
	attempts integer not null default 0
);

create unique index tasks_unique_key on tasks
using btree (name, execute_at, md5(params::text), md5(context::text));

create table task_stats (
	task_id bigint references tasks(id) on delete cascade,
	collection varchar not null,
	scheduled integer not null default 0,
	pending integer not null default 0,
	running integer not null default 0,
	failure integer not null default 0,
	timeout integer not null default 0,
	success integer not null default 0,
	locked integer not null default 0,
	total integer not null default 0,
	constraint task_stats_unique_key unique (task_id, collection)
);

create table executions (
	id bigserial primary key,
	task_id bigint not null references tasks(id) on delete cascade,
	status varchar not null default 'running',
	started_at timestamptz not null default now(),
	finished_at timestamptz
);

create table logs (
	id bigserial primary key,
	execution_id bigint not null references executions(id) on delete cascade,
	time timestamptz not null default now(),
	message jsonb
);


--- indexes ---

create index on executions (task_id, started_at desc);
create index on tasks (id, parent_id);
create index on tasks (execute_at desc);
create index on tasks (execute_at asc);
create index on tasks (priority asc);
create index on tasks (status);
create index on task_stats (task_id, collection);
create index on logs (execution_id, time);


-- default task status --

create function on_before_task_insert() returns trigger as $$
begin
	if new.id = new.parent_id then
		raise exception 'A task cannot reference itself as its parent';
	end if;
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
	old_row tasks;
begin
	if TG_OP = 'INSERT' then
		insert into task_stats (task_id, collection) values (new.id, 'children');
		insert into task_stats (task_id, collection) values (new.id, 'descendants');
		old_row = null;
	else
		old_row = old;
	end if;

	perform update_stats(TG_OP, TG_ARGV[0], old_row, new, 'children', false);
	perform update_stats(TG_OP, TG_ARGV[0], old_row, new, 'descendants', true);
	return new;
end
$$ language plpgsql volatile;


create function update_stats (
	op varchar, 
	arg varchar, 
	old tasks,
	new tasks,
	collection varchar,
	recurse boolean
) 
returns void as $$
begin
	if op = 'INSERT' then
		perform inc_task_stat(new.parent_id, collection, 'total', 1);
	end if;
	
	if old is not null and old.status is not null then
		perform inc_task_stat(new.parent_id, collection, old.status, -1);
	end if;	
	
	if new.status is not null then
		perform inc_task_stat(new.parent_id, collection, new.status, 1);
	end if;

	if arg = 'locked' then
		perform inc_task_stat(new.parent_id, collection, 'locked', 1);
	end if;

	if arg = 'unlocked' then
		perform inc_task_stat(new.parent_id, collection, 'locked', -1);
	end if;

	if recurse = true and new.parent_id is not null then
		select parent_id into new.parent_id from tasks where id = new.parent_id;
		perform update_stats(op, arg, old, new, collection, true);
	end if;
end
$$ language plpgsql;


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

create function descendant_tasks(task_id bigint) returns setof tasks as $$
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

comment on function descendant_tasks(bigint) is e'@sortable\n@filterable';


create function child_tasks(task_id bigint) returns setof tasks as $$
	select * from tasks
	where case when $1 is null 
	then 
		parent_id is null 
	else 
		parent_id = $1 
	end
$$ language sql stable;

comment on function child_tasks(bigint) is e'@sortable\n@filterable';


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


-- window functions --

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


create function tasks_children_stats(t tasks) returns jsonb as $$
	select to_jsonb(task_stats) - 'collection' - 'task_id' from task_stats 
	where collection = 'children' and task_id = t.id;
$$ 
language sql stable;


create function tasks_descendants_stats(t tasks) returns jsonb as $$
	select to_jsonb(task_stats) - 'collection' - 'task_id' from task_stats 
	where collection = 'descendants' and task_id = t.id;
$$ 
language sql stable;


create function tasks_descendant_tasks(t tasks) returns setof tasks as $$
	select * from descendant_tasks(t.id)
$$ 
language sql stable;


create function executions_duration(e executions) returns text as $$
	select to_char(coalesce(e.finished_at, now()) - e.started_at, 'HH24:MI:SS.MS');
$$ 
language sql stable;


create function tasks_complete(t tasks) returns boolean as $$
	select exists (
		select true from tasks
		inner join task_stats on tasks.id = task_stats.task_id 
		where tasks.id = t.id
		and task_stats.collection = 'descendants'
		and task_stats.locked = task_stats.total
	);
$$
language sql stable;


-- mutation functions --

create function update_execution_status(
	new_status varchar, 
	execution_id bigint, 
	task_id bigint, 
	max_attempts integer
) 
returns executions as $$
declare
	updated_execution executions;
	current_attempts integer;
begin
	if new_status not in ('success', 'timeout', 'failure') then
		raise exception 'An exectution status should only be updated to success, timeout or failure – got %', new_status;
	end if;

	update executions 
	set status = new_status, finished_at = now()
	where id = execution_id
	returning * into updated_execution;

	select attempts into current_attempts 
	from tasks where id = updated_execution.task_id;

	if updated_execution.status = 'success' or current_attempts >= max_attempts then
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
	execution_id bigint, 
	task_name text
) as $$
declare
	next_task tasks;
begin
	select * into next_task 
	from tasks t
	where (select count(*) from tasks where status = 'running') < concurrent_executions
	and t.status != 'running'
	and t.status != 'success'
	and t.execute_at < now()
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
	order by t.priority asc, t.execute_at asc
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


-- force execute --

create function execute_task(task_id bigint) returns executions as $$
	insert into executions (task_id) values (task_id) returning *;
$$ language sql volatile;


-- task events --

create function dispatch_task_event () returns trigger as $$
declare
	event_type varchar := tg_argv[0];
	payload jsonb;
	task tasks;
	execution executions;
	execution_jsonb jsonb;
begin
	if to_jsonb(new) ? 'task_id' then
		-- `new` is an `execution` or `task_stat` row
		select * into task from tasks where id = new.task_id;
	else
		task = new;
	end if;

	if event_type = 'complete' and task.locked = false then
		return new;
	end if;

	execution = tasks_latest_execution(task);
	execution_jsonb = jsonb_set(
		to_jsonb(execution), 
		'{duration}',
		format('"%s"', executions_duration(execution))::jsonb
	);
	
	payload = jsonb_build_object(
		'event', event_type,
		'task', to_jsonb(task), 
		'execution', execution_jsonb
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
	after update on task_stats
	for each row when (
		new.collection = 'descendants' and
		old.locked != old.total and
		new.locked = new.total
	)
	execute procedure dispatch_task_event('complete'); 


-- utility functions -- 

create function inc_task_stat (
	task_id bigint, 
	collection varchar, 
	col_name varchar, 
	value integer
) 
returns void as $$
begin
	if value is null then 
		value = 1; 
	end if;	
	execute	format(
		'update task_stats set %1$I = %1$I + %2$L 
		 where task_id = %3$L and collection = %4$L',
		col_name, value, task_id, collection
	);
end;
$$ language plpgsql volatile;
