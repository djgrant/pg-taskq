import React from "react";
import { RouteComponentProps } from "@reach/router";
import { graphql } from "@gqless/react";
import { query } from "../graphql";
import dayjs from "dayjs";

type LogsProps = RouteComponentProps<{ taskId: string }>;

export const Logs: React.FC<LogsProps> = graphql(({ taskId }) => {
  const logs = query.task({ id: Number(taskId) })?.latestExecution?.logs;

  if (!logs || !logs[0]?.id) {
    return <div className="text-gray-700">No logs</div>;
  }

  return (
    <div className="bg-gray-300">
      {logs?.map(log => (
        <div className="flex px-3 py-2 mb-1 space-x-3 text-sm bg-gray-100 ">
          <div className="text-gray-500">{dayjs(log.time).toString()}:</div>
          <pre className="whitespace-pre-wrap">{log.messageParsed}</pre>
        </div>
      ))}
    </div>
  );
});
