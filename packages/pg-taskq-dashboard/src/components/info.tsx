import React from "react";
import { RouteComponentProps } from "@reach/router";

type InfoProps = RouteComponentProps<{ taskId: string }>;

export const Info: React.FC<InfoProps> = ({ taskId }) => (
  <div>Info for {taskId}</div>
);
