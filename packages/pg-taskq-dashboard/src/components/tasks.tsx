import React from "react";
import { RouteComponentProps } from "@reach/router";
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

export const Tasks: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Header className="mb-3 -mt-1">
        <div className="w-1/4">Started</div>
        <div className="w-1/3">Name</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/4">Progress</div>
      </Header>
      <TaskRows />
    </>
  );
};

export const TaskRows = graphql(() => {
  const queryParams = {
    first: 15,
    orderBy: [ExtendedTasksOrderBy.LAST_EXECUTED_DESC],
  };
  usePoll(query.extendedTasks(queryParams), 5000);
  return (
    <>
      <div className="space-y-3">
        {query.extendedTasks(queryParams)!.map((task) => (
          <Row key={task.id}>
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
      </div>
      <div className="flex justify-end mt-6">
        {false && (
          <Button type="outline" size="sm">
            ← Newer
          </Button>
        )}
        <Button type="outline" size="sm">
          Older →
        </Button>
      </div>
    </>
  );
});
