import { useLocation, Outlet } from "react-router-dom";
import { azureLogin } from "../../utility/Urls";


function RequireAuth() {
  let isLogin = localStorage.getItem("access-token") !== null;

  if (!isLogin) {
    window.location.replace(azureLogin);
    return null;
  }

  return <Outlet />;
}

export default RequireAuth;
