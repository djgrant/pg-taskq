import React from "react";
import { RouteComponentProps, Link, useParams } from "@reach/router";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@djgrant/components";
import { tw } from "@djgrant/react-tailwind";
import { useQuery, TasksOrderBy } from "../gqless";
import { DescendantTaskProgress } from "./progress";
import { counts } from "./sidebar";
import { searchFrom } from "../observables";

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

export const Tasks: React.FC<TasksProps> = observer((props) => {
  const query = useQuery();
  const taskId = props.taskId === "root" ? null : props.taskId;
  const params = useParams();
  const queryParams = {
    taskId,
    first: 15,
    orderBy: [TasksOrderBy.LAST_EXECUTED_DESC],
    condition: params.status === "total" ? null : { status: params.status },
  };
  const { descendants } = searchFrom;
  const tasksQuery = descendants === "all" ? "descendantTasks" : "childTasks";
  const tasks = query[tasksQuery](queryParams);

  return (
    <>
      <div className="space-y-3">
        {(tasks || []).map(
          (task) =>
            task?.id && (
              <Link
                key={task.id}
                to={`/tasks/${String(task.id)}`}
                className="block"
              >
                <Row>
                  <div className="w-1/4 overflow-hidden font-normal">
                    {task.lastExecuted
                      ? `Ran ${dayjs(task.lastExecuted).fromNow()}`
                      : `Starts ${dayjs(task.executeAt).fromNow()}`}
                  </div>
                  <div className="w-1/3">{task.name}</div>
                  <div
                    className={`w-1/6 text-${task.status &&
                      counts[task.status as keyof typeof counts].color}-500`}
                  >
                    {task.status && capitalize(task.status)}
                  </div>
                  <div className="w-1/4">
                    <DescendantTaskProgress task={task} />
                  </div>
                </Row>
              </Link>
            )
        )}
      </div>
      {tasks && tasks.length > 14 && (
        <div className="flex justify-end my-6">
          {false && <Button size="sm">← Newer</Button>}
          <Button size="sm" disabled>
            Older →
          </Button>
        </div>
      )}
    </>
  );
});

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
