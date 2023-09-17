import React from "react";
import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LeadsPage from "./pages/leads/LeadsPage";
import LoginPage from "./pages/login/LoginPage";
import UserManagement from "./pages/user-management/UserManagement";
import Report from "./pages/Report/Report";
import RequireAuth from "./components/auth/RequireAuth";



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

