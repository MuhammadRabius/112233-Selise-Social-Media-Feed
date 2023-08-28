import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
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