import React from "react";
import { Router } from "@reach/router";
import { Heading, Input, Tabs, Tab } from "@djgrant/components";
import { Tasks } from "./tasks";
import { Sidebar } from "./sidebar";

export const App = () => (
  <div className="h-screen">
    <header className="flex bg-blue-400">
      <div className="w-64 px-6 py-4 border-r-2 border-blue-500">
        <Heading h1 className="text-white">
          pg-taskq
        </Heading>
      </div>
      <div className="flex items-center px-4 opacity-75">
        <Input type="search" placeholder="Todo..." disabled />
      </div>
    </header>

    <div className="flex h-full">
      <div className="w-64 py-6 pr-6 border-r-2 border-gray-200">
        <Sidebar />
      </div>

      <main className="flex-grow px-6 py-2">
        <div className="mb-6 border-b border-gray-200">
          <Tabs direction="horizontal">
            <Tab to="/tasks" default>
              Tasks
            </Tab>
            <Tab to="/meta">Metadata</Tab>
            <Tab to="/logs">Logs</Tab>
          </Tabs>
        </div>
        <Router>
          <Tasks path="tasks" default />
        </Router>
      </main>
    </div>
  </div>
);
