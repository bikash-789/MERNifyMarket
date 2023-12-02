import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";

ReactDOM.render(
  <NextUIProvider>
    <React.StrictMode>
      <main
        className="bg-slate-200 h-full w-[100vw]"
        style={{ background: "#F4F3EE" }}
      >
        <Routes />
      </main>
    </React.StrictMode>
  </NextUIProvider>,
  document.getElementById("root")
);
