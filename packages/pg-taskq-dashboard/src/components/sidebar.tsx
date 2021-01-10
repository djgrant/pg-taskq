import React, { Suspense } from "react";
import { Link, Match } from "@reach/router";
import { Badge, H6, Label, Input, Tabs, Tab } from "@djgrant/components";
import { graphql, usePoll } from "@gqless/react";
import { observer } from "mobx-react";
import { query } from "../graphql";
import { Up } from "./icons";

export const counts = {
  total: { label: "All", color: "blue" },
  scheduled: { label: "Scheduled", color: "gray" },
  pending: { label: "Pending", color: "yellow" },
  running: { label: "Running", color: "indigo" },
  success: { label: "Successful", color: "green" },
  failure: { label: "Failed", color: "red" },
  timeout: { label: "Timed out", color: "orange" },
};

export const Sidebar = () => (
  <Match<{ taskId: string }> path="./tasks/:taskId/*">
    {({ match }) => {
      const taskId = match?.taskId === "root" ? null : match?.taskId || null;
      return (
        <div className="space-y-4">
          <h3 className="flex items-center justify-between mt-1 mb-6 ml-6 text-xl font-medium text-pink-600 font-heading">
            <TaskName taskId={taskId} />
            <UpButton taskId={taskId} />
          </h3>
          <Tabs direction="vertical">
            {Object.entries(counts).map(([key, { label, color }], i) => (
              <Tab
                key={key}
                to={
                  taskId
                    ? `/tasks/${taskId}/tasks/${key}`
                    : `/tasks/root/tasks/${key}`
                }
                defaultOf={
                  i === 0
                    ? taskId
                      ? `./tasks/${taskId}/tasks`
                      : `./tasks/root/tasks`
                    : undefined
                }
              >
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
            <DescendantsForm />
          </div>
        </div>
      );
    }}
  </Match>
);

interface LiveCountProps {
  field: string;
  taskId: string | null;
}

const LiveCount = observer(
  graphql(({ taskId, field }: LiveCountProps) => {
    let stats;
    const { descendants } = query.local.searchForm;

    if (taskId !== null) {
      const statsQuery =
        descendants === "all" ? "descendantsStats" : "childrenStats";
      stats = query.task({ id: taskId })![statsQuery];
    } else {
      const statsQuery =
        descendants === "all" ? "rootDescendantsStats" : "rootChildrenStats";
      stats = query[statsQuery];
    }

    usePoll(stats, 5000);
    return stats ? stats[field] : 0;
  })
);

const trimName = (str: string) => {
  if (str.length > 18) {
    return str.slice(0, 16) + "...";
  }
  return str;
};

const TaskName = graphql(({ taskId }: { taskId: string | null }) => {
  if (!taskId) return "Root tasks";
  return trimName(query.task({ id: taskId })?.name || "");
});

const UpButton = graphql(({ taskId }: { taskId: string | null }) => {
  if (!taskId) return null;
  const parentId = query.task({ id: taskId })?.parentId;
  return (
    <Link to={`/tasks/${parentId || "root"}`} title="Up one level">
      <Up className="w-6 h-6" />
    </Link>
  );
});

const DescendantsForm = observer(() => {
  const searchForm = query.local.searchForm;
  return (
    <div className="space-y-2">
      <Label layout="col">
        <Input
          type="radio"
          name="descendants"
          value="all"
          checked={searchForm.descendants === "all"}
          onChange={() => {
            searchForm.descendants = "all";
          }}
        />
        <span>All</span>
      </Label>
      <Label layout="col">
        <Input
          type="radio"
          name="descendants"
          value="direct"
          checked={searchForm.descendants === "direct"}
          onChange={() => {
            searchForm.descendants = "direct";
          }}
        />
        <span>Direct</span>
      </Label>
    </div>
  );
});
