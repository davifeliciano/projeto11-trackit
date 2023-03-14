import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import GlobalStyle from "./styles/GlobalStyle";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

axios.defaults.baseURL =
  "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

const router = createBrowserRouter([
  {
    path: "/",
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
