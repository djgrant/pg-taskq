import React, { Suspense } from "react";
import { RouteComponentProps } from "@reach/router";
import { useQuery } from "../gqless";
import dayjs from "dayjs";

type LogsProps = RouteComponentProps<{ taskId: string }>;

export const LogsInner: React.FC<LogsProps> = ({ taskId }) => {
  const query = useQuery();
  const task = query.task({ id: taskId });
  // usePoll(task, 1000);

  const logs = task?.latestExecution?.logs();

  if (!logs || !logs[0]?.id) {
    return <div className="text-gray-700">No logs</div>;
  }

  return (
    <div className="bg-gray-100 border rounded">
      {logs.map((log, i) => (
        <div
          className={` px-3 py-2 text-sm ${i > 0 &&
            "border-t"} hover:bg-gray-200`}
        >
          <div className="text-xs text-gray-500">
            {dayjs(log.time).toString()}:
          </div>
          <pre className="whitespace-pre-wrap">{log.messageParsed}</pre>
        </div>
      ))}
    </div>
  );
};

export const Logs: React.FC<LogsProps> = (props) => (
  <Suspense fallback={<div className="text-gray-700">No logs</div>}>
    <LogsInner {...props} />
  </Suspense>
);
