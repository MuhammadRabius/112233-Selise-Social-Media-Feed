import React, { useEffect, useState } from "react";
import "./loginPage.css";
import logo from "../../assets/img/metlifelogo.png";
import { userLogin } from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";

const LoginPage = () => {
  const azureLogin =
    "https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/authorize?client_id=5a6f192a-8f85-4f86-8715-2efa16a9ea41&response_type=code&redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&response_mode=query&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read";

  const azureLogoutUrl = `https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=${azureLogin}`;

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
            const token = res.data.data.token;
            const username = res.data.data.username;
            const role = res.data.data.authority;
            const expiration = res.data.data.expiration;
            localStorage.setItem("access-token", token);
            const user = jwt_decode(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("role", JSON.stringify(role));
            localStorage.setItem("expiration", JSON.stringify(expiration));
            window.location.href = "/dashboard";
            message.success(res.data.message);
            setLoading(false);
            return;
          }
        } catch (error) {
          setLoading(false);
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
                    {status !== null && (status === 500 || 401) ? (
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
