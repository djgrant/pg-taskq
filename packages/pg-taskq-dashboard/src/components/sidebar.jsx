import React from "react";
import { useQuery } from "urql";
import { Badge, Heading, Label, Input, Tabs, Tab } from "@djgrant/components";

const typenameFilter = ([key]) => key !== "__typename";

const SidebarQuery = `
  query {
    descendantTasksCounts(taskId: null) {
      total
      pending
      failure
      running
      scheduled
      success
      timeout
    }
  }
`;

export const Sidebar = () => {
  const [result] = useQuery({
    query: SidebarQuery,
    pollInterval: 5000,
  });
  const { data } = result;
  if (!data) return <div />;
  return (
    <div className="space-y-4">
      <h3 className="mx-6 mt-1 mb-6 text-xl font-medium text-gray-500 font-heading">
        Root Tasks
      </h3>
      <Tabs direction="vertical">
        {Object.entries(data.descendantTasksCounts)
          .filter(typenameFilter)
          .map(([key, value], i) => (
            <Tab key={key} to={`/tasks/${key}`} default={i === 0}>
              <div className="flex justify-between">
                <div>{key}</div>
                <Badge color="green">{value}</Badge>
              </div>
            </Tab>
          ))}
      </Tabs>
      <div className="px-6 space-y-4">
        <Heading h6>Descendants</Heading>
        <div class="space-y-2">
          <Label layout="col">
            <Input type="radio" name="descendants" value="all" checked />
            <span>All</span>
          </Label>
          <Label layout="col">
            <Input type="radio" name="descendants" value="direct" />
            <span>Direct</span>
          </Label>
        </div>
      </div>
    </div>
  );
};
