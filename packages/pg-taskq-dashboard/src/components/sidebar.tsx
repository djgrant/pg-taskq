import React, { Suspense } from "react";
import { RouteComponentProps } from "@reach/router";
import { Badge, H6, Label, Input, Tabs, Tab } from "@djgrant/components";
import { graphql, usePoll } from "@gqless/react";
import { query } from "../graphql";

const counts = {
  total: { label: "All", color: "green" },
  scheduled: { label: "Scheduled", color: "green" },
  pending: { label: "Pending", color: "green" },
  running: { label: "Running", color: "green" },
  success: { label: "Successful", color: "green" },
  failure: { label: "Failed", color: "green" },
  timeout: { label: "Timed out", color: "green" },
};

type SidebarProps = RouteComponentProps<{ taskId?: string }>;

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const taskId = props.taskId ? Number(props.taskId) || null : null;
  return (
    <div className="space-y-4">
      <h3 className="mx-6 mt-1 mb-6 text-xl font-medium text-gray-500 font-heading">
        <TaskName taskId={taskId} />
      </h3>
      <Tabs direction="vertical">
        {Object.entries(counts).map(([key, { label, color }], i) => (
          <Tab key={key} to={`/tasks/${key}`}>
            <div className="flex justify-between">
              <div>{label}</div>
              <Suspense fallback="">
                <Badge color={color}>
                  <LiveCount field={key} taskId={taskId} />
                </Badge>
              </Suspense>
            </div>
          </Tab>
        ))}
      </Tabs>
      <div className="px-6 space-y-4">
        <H6>Descendants</H6>
        <div className="space-y-2">
          <Label layout="col">
            <Input type="radio" name="descendants" value="all" checked />
            <span>All</span>
          </Label>
          <Label layout="col">
            <Input type="radio" name="descendants" value="direct" />
            <span>Direct</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

interface LiveCountProps {
  field: string;
  taskId: number | null;
}

const LiveCount = graphql(({ field, taskId }: LiveCountProps) => {
  const count = query.descendantTasksCounts({ taskId })[
    field as keyof typeof counts
  ];
  usePoll(count, 5000);
  return count;
});

const TaskName = graphql(({ taskId }: { taskId: number | null }) => {
  if (!taskId) return "Root tasks";
  return query.task({ id: taskId })?.name;
});
