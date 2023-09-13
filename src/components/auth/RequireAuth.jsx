

import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  let isLogin = localStorage.getItem('access-token') !== null;

  let location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default RequireAuth;


