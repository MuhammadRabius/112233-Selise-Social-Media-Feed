import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import App from "./App";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
// axios.defaults.baseURL =  "http://10.69.13.7:8200";
axios.defaults.baseURL =  "http://10.40.93.204:8200";
// axios.defaults.baseURL =
//   "https://qa.eclaims.metlife.com.bd/public/ulm-api-external";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access-token");
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
