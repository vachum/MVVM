import React from "react";
import ReactDOM from "react-dom/client";
import Presenter from "./presenters/UserPresenter";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Presenter />
  </React.StrictMode>
);
