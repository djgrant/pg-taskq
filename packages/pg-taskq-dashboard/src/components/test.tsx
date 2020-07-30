import React, { Suspense } from "react";
import { graphql, usePoll } from "@gqless/react";
import { query } from "../graphql";

export const Test = () => {
  const task = query.descendantTasks({ first: 1 });
  return <div>Test {task.map(task => task.id)}</div>;
};
