import React from "react";
import { useQuery } from "../gqless";

export const Test = () => {
  const query = useQuery();
  const task = query.descendantTasks({ first: 1 });
  return <div>Test {task.map((task) => task?.id)}</div>;
};
