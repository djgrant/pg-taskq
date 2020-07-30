import React, { Suspense } from "react";
import { Router } from "@reach/router";
import { H1, Input, Tabs, Tab } from "@djgrant/components";
import { Tasks } from "./tasks";
import { Sidebar } from "./sidebar";
import * as loading from "./loading";

export const App = () => (
  <Suspense fallback={loading.fullscreen}>
    <div className="h-screen">
      <header className="flex bg-blue-400">
        <div className="w-64 px-6 py-4 border-r-2 border-blue-500">
          <H1 className="text-white">pg-taskq</H1>
        </div>
        <div className="flex items-center px-4 opacity-75">
          <Input type="search" placeholder="Todo..." disabled />
        </div>
      </header>

      <div className="flex h-full">
        <div className="w-64 py-6 pr-4 border-r-2 border-gray-200">
          <Router>
            <Sidebar path="tasks/:taskId/*" />
            <Sidebar path="tasks" />
          </Router>
        </div>

        <main className="flex-grow px-6 py-2">
          <div className="mb-6 border-b border-gray-200">
            <Tabs direction="horizontal">
              <Tab to="/tasks/total" default>
                Tasks
              </Tab>
              <Tab to="/meta">Metadata</Tab>
              <Tab to="/logs">Logs</Tab>
            </Tabs>
          </div>
          <Suspense fallback={loading.text}>
            <Router>
              <Tasks path="tasks/:taskId/*" />
            </Router>
          </Suspense>
        </main>
      </div>
    </div>
  </Suspense>
);
