import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LeadsPage from "./pages/leads/LeadsPage";
import LoginPage from "./pages/login/LoginPage";
import UserManagement from "./pages/user-management/UserManagement";
import Report from "./pages/Report/Report";
import RequireAuth from "./components/auth/RequireAuth";
// var AzureUrl = "https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/authorize?client_id=5a6f192a-8f85-4f86-8715-2efa16a9ea41&response_type=code&redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&response_mode=query&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read"



const App = () => {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;


// const HomePage = lazy(() => import('./pages/home/HomePage'));
// const LeadsPage = lazy(() => import('./pages/leads/LeadsPage'));
// const LoginPage = lazy(() => import('./pages/login/LoginPage'));
// const Report = lazy(() => import('./pages/Report/Report'));
// const UserManagement = lazy(() => import('./pages/user-management/UserManagement'));
// <Route path="/login" element={<LoginPage />} />