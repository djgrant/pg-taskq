import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { Button, Progress } from "@djgrant/components";
import { tw } from "@djgrant/react-tailwind";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { graphql, usePoll } from "@gqless/react";
import { query, TasksOrderBy } from "../graphql";

dayjs.extend(relativeTime);

const Row = tw.div(
  "flex",
  "px-4",
  "py-3",
  "rounded",
  "animated fadeIn",
  "border",
  "border-gray-300",
  "bg-gray-100",
  "text-gray-600",
  "text-xs",
  "font-medium",
  "items-center"
);

const Header = tw.div(
  "flex",
  "px-4",
  "py-1",
  "text-xs",
  "font-medium",
  "text-gray-500"
);

type TasksProps = RouteComponentProps<{ taskId?: string }>;

export const Tasks: React.FC<TasksProps> = (props) => {
  const taskId = props.taskId ? Number(props.taskId) || null : null;
  return (
    <>
      <Header className="mb-3 -mt-1">
        <div className="w-1/4">Start time</div>
        <div className="w-1/3">Name</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/4">Progress</div>
      </Header>
      <TaskRows taskId={taskId} />
    </>
  );
};

export const TaskRows = graphql(({ taskId }: { taskId: number | null }) => {
  const queryParams = {
    taskId,
    first: 15,
    orderBy: [TasksOrderBy.LAST_EXECUTED_DESC],
  };
  const tasks = query.descendantTasks(queryParams);
  usePoll(tasks, 5000);
  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Link
            key={task.id}
            to={`/tasks/${String(task.id)}/meta`}
            className="block"
          >
            <Row>
              <div className="w-1/4 overflow-hidden font-normal">
                {task.lastExecuted
                  ? `Ran ${dayjs(task.lastExecuted).fromNow()}`
                  : `Starts ${dayjs(task.executeAt).fromNow()}`}
              </div>
              <div className="w-1/3">{task.name}</div>
              <div className="w-1/6">{task.status}</div>
              <div className="w-1/4">
                <Progress
                  bars={[{ label: "Completed", color: "green", pc: 10 }]}
                  size="sm"
                />
              </div>
            </Row>
          </Link>
        ))}
      </div>
      {tasks.length > 15 && (
        <div className="flex justify-end mt-6">
          {false && <Button size="sm">← Newer</Button>}
          <Button size="sm">Older →</Button>
        </div>
      )}
    </>
  );
});
