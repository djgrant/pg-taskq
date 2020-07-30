import React from "react";
import { RouteComponentProps, Link, useParams } from "@reach/router";
import { Button, Progress } from "@djgrant/components";
import { tw } from "@djgrant/react-tailwind";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { graphql, usePoll } from "@gqless/react";
import { query, ExtendedTasksOrderBy } from "../graphql";

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
  "hover:bg-gray-200",
  "text-gray-600",
  "text-xs",
  "font-medium",
  "items-center"
);

type TasksProps = RouteComponentProps<{ taskId?: string }>;

export const Tasks: React.FC<TasksProps> = graphql((props) => {
  const taskId = props.taskId ? Number(props.taskId) || null : null;
  const params = useParams();
  const queryParams = {
    taskId,
    first: 15,
    orderBy: [ExtendedTasksOrderBy.LAST_EXECUTED_DESC],
    condition: params.status === "total" ? null : { status: params.status },
  };
  const tasks = query.descendantTasks(queryParams);

  usePoll(tasks, 5000);

  if (!tasks[0]?.id) {
    return <div className="text-gray-700">No tasks</div>;
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map(
          (task) =>
            task?.id && (
              <Link
                key={task.id}
                to={`/tasks/${String(task.id)}`}
                className="block"
                onClick={() => (query.task({ id: task.id })!.name = task.name)}
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
            )
        )}
      </div>
      {tasks.length > 14 && (
        <div className="flex justify-end mt-6">
          {false && <Button size="sm">← Newer</Button>}
          <Button size="sm" disabled>
            Older →
          </Button>
        </div>
      )}
    </>
  );
});
