import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LeadsPage from "./pages/leads/LeadsPage";
import LoginPage from "./pages/login/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";
import axios from "axios";
import 'primeicons/primeicons.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";     
import LeadSubmission from "./pages/leadsubmission/LeadSubmission";
import UserManagement from "./pages/user-management/UserManagement";
import Report from "./pages/Report/Report";

// axios.defaults.baseURL =  "http://10.40.92.245:8200";
// axios.defaults.baseURL =  "http://10.69.13.7:8200";
// axios.defaults.baseURL =  "http://10.68.13.20:8200";
axios.defaults.baseURL =  "https://qa.eclaims.metlife.com.bd/public/ulm-api-external";
// axios.defaults.baseURL =  "http://10.40.92.200:8200";
// axios.defaults.baseURL = "http://10.40.92.27:8200";
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access-token");
axios.defaults.headers.post["Content-Type"] = "application/json";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/leads" element={<LeadsPage />} />
        
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/report" element={<Report/>} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
