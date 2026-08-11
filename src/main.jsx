import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/global.css";
import "./styles/header.css";
import "./styles/createbill.css";
import "./styles/billpreview.css";
import "./styles/layout.css";
import "./styles/print.css";
import router from "./routes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>

);