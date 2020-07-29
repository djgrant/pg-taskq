import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import "./assets/tailwind.output.css";
import "animate.css/animate.compat.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
