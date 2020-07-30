import React, { Suspense } from "react";
import { Router, Link, Redirect } from "@reach/router";
import { Sidebar } from "./sidebar";
import { TopTabs } from "./tabs";
import { Tasks } from "./tasks";
import { Logs } from "./logs";
import { Info } from "./info";
import { H1, Input } from "@djgrant/components";

import * as loading from "./loading";

export const App = () => (
  <Suspense fallback={loading.fullscreen}>
    <div className="h-screen">
      <header className="flex bg-blue-400">
        <div className="w-64 px-6 py-4 border-r-2 border-blue-500">
          <Link to="/tasks">
            <H1 className="text-white">pg-taskq</H1>
          </Link>
        </div>
        <div className="flex items-center px-4 opacity-75">
          <Input type="search" placeholder="Todo..." disabled />
        </div>
      </header>

      <div className="flex h-full">
        <div className="w-64 py-6 pr-4 border-r-2 border-gray-200">
          <Suspense fallback="">
            <Sidebar />
          </Suspense>
        </div>

        <main className="flex-grow px-6 py-2">
          <div className="mb-6 border-b border-gray-200">
            <TopTabs />
          </div>
          <Suspense fallback={loading.text}>
            <Router>
              <Tasks path="tasks/:taskId/tasks/:status" />
              <Info path="tasks/:taskId/info" />
              <Logs path="tasks/:taskId/logs" />
              <Redirect from="/tasks" to="/tasks/root/tasks" noThrow />
            </Router>
          </Suspense>
        </main>
      </div>
    </div>
  </Suspense>
);
