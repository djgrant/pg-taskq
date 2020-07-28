import React from "react";
import ReactDOM from "react-dom";
import { createClient, Provider } from "urql";
import { App } from "./components/app";
import "./assets/tailwind.output.css";
import "animate.css/animate.compat.css";

const client = createClient({
  url: "/graphql",
  requestPolicy: "cache-and-network",
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
