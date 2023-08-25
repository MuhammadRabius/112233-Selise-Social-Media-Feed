import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  let isLogin = localStorage.getItem('access-token') !== null;

  isLogin = true;

  let location = useLocation();

  if (!isLogin) {
    console.log("user not login");
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default RequireAuth;
