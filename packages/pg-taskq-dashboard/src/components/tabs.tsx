import React from "react";
import { Match } from "@reach/router";
import { Tabs, Tab } from "@djgrant/components";

export const TopTabs = () => (
  <Match<{ taskId: string }> path="./tasks/:taskId/*">
    {({ match }) => {
      const taskId = match?.taskId || "root";
      return (
        <Tabs direction="horizontal">
          {taskId !== "root" && (
            <Tab to={`/tasks/${taskId}/info`} defaultOf={`./tasks/${taskId}`}>
              Info
            </Tab>
          )}
          <Tab
            to={`/tasks/${taskId}/tasks`}
            defaultOf={taskId === "root" ? `./tasks/root` : undefined}
          >
            Tasks
          </Tab>
          <Tab to={taskId ? `/tasks/${taskId}/logs` : "/logs"}>Logs</Tab>
        </Tabs>
      );
    }}
  </Match>
);
