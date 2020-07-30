import React from "react";
import { RouteComponentProps } from "@reach/router";

type LogsProps = RouteComponentProps<{ taskId: string }>;

export const Logs: React.FC<LogsProps> = ({ taskId }) => (
  <div>Logs for {taskId}</div>
);
