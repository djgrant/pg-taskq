import React from "react";
import { RouteComponentProps } from "@reach/router";
import { graphql, usePoll } from "@gqless/react";
import { query } from "../graphql";
import { H6 } from "@djgrant/components";
import dayjs from "dayjs";

type InfoProps = RouteComponentProps<{ taskId: string }>;

export const Info: React.FC<InfoProps> = graphql(({ taskId }) => {
  const task = query.task({ id: Number(taskId) });
  usePoll(task, 5000);

  if (!task) return;

  return (
    <div className="bg-gray-100 border rounded">
      <DataRow label="Name" value={task.name} />
      <DataRow label="Attempts" value={task.attempts} />
      <DataRow label="Status" value={task.status} />
      {!["pending", "scheduled"].includes(task.status as string) && (
        <DataRow
          label="Last executed"
          value={dayjs(task.lastExecuted).toString()}
        />
      )}
      <DataRow label="Child tasks" value={task.children.length} />
      <DataRow label="Params">
        <pre>
          <code>{JSON.stringify(task.params, null, 2)}</code>
        </pre>
      </DataRow>
      <DataRow label="Context">
        <pre>
          <code>{JSON.stringify(task.context, null, 2)}</code>
        </pre>
      </DataRow>
      <DataRow label="Debug Template" last>
        <pre>
          <code>
            {createDebugTemplate(task.name, task.params, task.context)}
          </code>
        </pre>
      </DataRow>
    </div>
  );
});

interface DataRowProps {
  label: string;
  value?: React.ReactNode;
  last?: boolean;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, children, last }) => (
  <div
    className={`p-3 text-sm relative text-gray-700
      ${value ? "flex items-center space-x-3" : "space-y-2"} 
      ${!last && "border-b"}
    `}
  >
    <H6>{label}</H6>
    <div style={{ marginTop: "-2px" }}>{value || children}</div>
  </div>
);

const createDebugTemplate = (
  name: string,
  params?: {} | null,
  context?: {} | null
) => `taskq.debug("${name}", {
  params: ${JSON.stringify(params, null, 2)}, 
  context: ${JSON.stringify(context, null, 2)}
});`;
