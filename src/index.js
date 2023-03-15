import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import App from "./App";

axios.defaults.baseURL =
  "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

dayjs.locale("pt-br");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
