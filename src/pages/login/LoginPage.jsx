import React, { useEffect, useState } from "react";
import "./loginPage.css";
import logo from "../../assets/img/metlifelogo.png";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";
import { userLogin } from "../../services/Services";
import { clearCookies } from "../../global_state/action";

const LoginPage = () => {
  const azureLogin =
    "https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/authorize?client_id=7c2a7e4f-2fc8-463a-be17-acdc93f37b92&response_type=code&redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&response_mode=query&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read";
  const azureLogoutUrl = `https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read`;

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const token = localStorage.getItem("access-token");
  if (code === null) {
    window.location.href = azureLogin;
  } else if (token !== null) {
    <Navigate to="/dashboard" replace />;
  }

  const payload = {
    authorizationCode: code,
  };

  useEffect(() => {
    if (code) {
      (async () => {
        try {
          setLoading(true);
          const res = await userLogin(payload);

          if (res.data.status === true) {
            setStatus(200);
            const token = res?.data?.data?.token;
            const username = res?.data?.data?.username;
            const authority = res?.data?.data?.authority[0]?.authority;
            localStorage.setItem("access-token", token);
            const user = jwt_decode(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("authority", JSON.stringify(authority));
            window.location.href =
              authority === "ROLE_CALL_CENTER" ? "/leads" : "/dashboard";
            message.success(res.data.message);
            setLoading(false);
            return;
          }
        } catch (error) {
          setStatus(error?.response?.status);
          setLoading(false);
          clearCookies();
          setTimeout(() => {
            error?.response?.data?.details[0] &&
              message.error(error?.response?.data?.details[0]);
            window.location.reload();
            window.location.href = azureLogoutUrl;
          }, 2000);
        }
      })();
    }
  }, [code]);

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="login-container" data-testid="login-mock">
          <div className="login-card">
            <div className="redirect">
              <div className="metlife-logo mt-4">
                <img src={logo} width={120} alt="logo" />
              </div>
              <div className="sign_text">
                {status === 200 ? (
                  <>
                    <h6>Redirecting to Dashboard</h6>
                    <ReloadOutlined spin /> ...
                  </>
                ) : (
                  <>
                    {status === 401 ? (
                      <>
                        <h6>
                          {" "}
                          <span style={{ color: "red", marginRight: "5px" }}>
                            User not found !
                          </span>
                          Redirecting to Login
                        </h6>
                        <ReloadOutlined spin /> ...
                      </>
                    ) : (
                      <>
                        <h6> Redirecting to Login</h6>
                        <ReloadOutlined spin /> ...
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
