import React from "react";
import { useQuery } from "urql";
import { Button, Progress } from "@djgrant/components";
import { tw } from "@djgrant/react-tailwind";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

const TasksQuery = `
  query {
    extendedTasks(first: 15, orderBy: LAST_EXECUTED_DESC) {
      id
      name
      status
      lastExecuted
      executeAt
    }
  }
`;

export const Tasks = () => {
  return (
    <div class="space-y-3">
      <Header className="-mt-1 ">
        <div className="w-1/4">Started</div>
        <div className="w-1/3">Name</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/4">Progress</div>
      </Header>
      <TaskRows />
    </div>
  );
};

export const TaskRows = () => {
  const [result] = useQuery({
    query: TasksQuery,
    pollInterval: 1500,
  });
  const { data, fetching, error } = result;
  if (!data) {
    return (
      <p className="p-3 text-sm text-gray-700">
        {fetching ? "Loading..." : `Oh no... ${error.message}`}
      </p>
    );
  }
  return (
    <>
      {data.extendedTasks.map((task) => (
        <Row key={task.id} border>
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
      ))}
      <div className="flex justify-between">
        <Button type="outline">← Newer</Button>
        <Button type="outline">Older →</Button>
      </div>
    </>
  );
};
