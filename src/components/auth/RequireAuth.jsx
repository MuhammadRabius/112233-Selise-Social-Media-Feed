import { useLocation, Outlet } from "react-router-dom";

const azureUrl =
  "https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/authorize?client_id=5a6f192a-8f85-4f86-8715-2efa16a9ea41&response_type=code&redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&response_mode=query&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read";

function RequireAuth() {
  let isLogin = localStorage.getItem("access-token") !== null;

  if (!isLogin) {
    window.location.replace(azureUrl);
    return null;
    ;
  }

  return <Outlet />;
}

export default RequireAuth;
