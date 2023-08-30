import React, { useEffect, useState } from "react";
import "./loginPage.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import logo from "../../assets/img/metlifelogo.png";
import { userLogin } from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import TextInput from "../../components/inputs/TextInput";
import { ReloadOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMassage] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  const token = localStorage.getItem("access-token");
  if (token !== null) {
    <Navigate to="/" replace />;
  }

  const payload = {
    authorizationCode: code,
  };

  // Api Calling ----------

  useEffect(() => {
    (async () => {
      
      if (payload) {
        try {
          setLoading(true);
          const res = await userLogin(payload);
          const token = res.data.data.token;
          const username = res.data.data.username;
          localStorage.setItem("access-token", token);
          const user = jwt_decode(token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("username", JSON.stringify(username));
          window.location.href = "/";
          message.success(res.data.message);
          setLoading(false);
        } catch (error) {
          console.log(error);
          message.error("Something went wrong !");
          setLoading(false);
          // error?.response?.data?.details[0] &&
          //   message.error(error?.response?.data?.details[0]);
        }
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="login-container">
          <div className="login-card">
            <div className="redirect">
              <div className="metlife-logo mt-4">
                <img src={logo} width={120} alt="logo" />
              </div>
              <div className="sign_text">
                <h6> Redirecting to ULM Dashboard</h6>
                <ReloadOutlined spin /> ...
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
