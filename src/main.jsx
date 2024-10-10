import React from "react";
import ReactDOM from "react-dom/client";
import { AppNew } from "./AppNew";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {true && <AppNew />}
    {false && <App />}
  </React.StrictMode>
);
