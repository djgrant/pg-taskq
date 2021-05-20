import React from "react";
import { Link } from "@reach/router";
import { Progress } from "@djgrant/components";
import { TasksEdge } from "../gqless";

const countsMap = {
  success: { label: "Successful", color: "green" },
  failure: { label: "Failed", color: "red" },
  timeout: { label: "Timed out", color: "orange" },
  running: { label: "Running", color: "indigo" },
  pending: { label: "Pending", color: "yellow" },
  scheduled: { label: "Scheduled", color: "white" },
};

interface ProgressProps {
  task: TasksEdge["node"];
}

export const DescendantTaskProgress: React.FC<ProgressProps> = ({ task }) => {
  const counts = task!.descendantsStats;

  if (!counts) return null;

  const total = Number.parseFloat(counts.total);
  const pending = Number.parseFloat(counts.pending);
  const scheduled = Number.parseFloat(counts.scheduled);
  const success = Number.parseFloat(counts.success);
  const running = Number.parseFloat(counts.running);
  const todo = pending + scheduled;
  const remaining = scheduled + pending;

  if (!counts.total) return null;

  let text;
  let bars;

  if (total === 0) {
    return (
      <div className="pl-2 font-normal text-gray-500">No nested tasks</div>
    );
  } else if (todo === total) {
    text = `Awaiting ${todo} nested task${todo > 1 ? "s" : ""}`;
    if (scheduled === total) {
      text = <div className="font-normal text-gray-500">{text}</div>;
    }
  } else if (success === total) {
    text = `Completed ${total} nested task${total > 1 ? "s" : ""}`;
  } else {
    text = `${remaining + running} nested task${
      remaining + running > 1 ? "s" : ""
    } remaining `;
  }

  if (!bars) {
    bars = Object.entries(countsMap)
      .map(([key, props]) => {
        const keyCount = Number.parseFloat(
          counts![key as keyof typeof countsMap]
        );
        const pc = keyCount === 0 ? 0 : (keyCount / total) * 100;
        return {
          label: `${props.label} (${keyCount})`,
          color: props.color,
          pc,
        };
      })
      .filter((v) => v.pc > 0);
  }

  return (
    <Link to={`/tasks/${String(task!.id)}/tasks`}>
      <Progress size="sm" bars={bars} children={text} />
    </Link>
  );
};
