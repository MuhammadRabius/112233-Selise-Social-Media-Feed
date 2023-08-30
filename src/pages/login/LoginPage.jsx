import React, { useEffect, useState } from "react";
import "./loginPage.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import queryString from "query-string";
import * as Yup from "yup";
import logo from "../../assets/img/metlifelogo.png";
import { userLogin } from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import TextInput from "../../components/inputs/TextInput";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";
import { useSearchParams } from 'react-router-dom'

const LoginPage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMassage] = useState("");
  const a = useSearchParams();
  console.log("a",a)

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(5, "Password must be 5 characters at minimum")
      .required("Password is required"),
  });

  const token = localStorage.getItem("access-token");

  // const params = window.location.search;
  // const { code, session_state } = ;

// console.log("code + session_state",code ,session_state)

  // Api Calling ----------

  useEffect(() => {
    if (token !== null) {
      return <Navigate to="/" replace />;
    }

    (async () => {
      try {
        setIsloading(true);
        const res = await userLogin();

        if (res.data.status === false) {
          // message.error(res.data.message);
          setErrorMassage(res.data.message);
          setIsloading(false);
        }
        const token = res.data.data.token;
        const username = res.data.data.username;
        localStorage.setItem("access-token", token);
        const user = jwt_decode(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("username", JSON.stringify(username));
        window.location.href = "/";
        message.success(res.data.message);
        setIsloading(false);
      } catch (error) {
        console.log(error);
        
        // error?.response?.data?.details[0] &&
        //   message.error(error?.response?.data?.details[0]);
        setIsloading(false);
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
            <div className="metlife-logo mt-4">
              <img src={logo} width={120} alt="logo" />
            </div>

            <h6 className="sign_text">Sign into your account</h6>
            <p className="enter_text mt-2 mb-5">
              <small> Enter your Active Directory ID</small>
            </p>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={LoginSchema}
              // onSubmit={handleSubmit}
            >
              <Form>
                <div className="login-input-group mt-3">
                  <TextInput
                    type={"text"}
                    name={"username"}
                    placeholder={"Active Directory ID"}
                  />
                  <TextInput
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    classes={"mt-2"}
                  />
                  {errorMessage && (
                    <div data-testid="login-error">
                      <p id="error" style={{ marginTop: "20px", color: "red" }}>
                        {errorMessage}
                      </p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="login-button "
                  >
                    LOGIN
                  </button>

                  <p className="mt-3">
                    <small className="__lw_text">
                      Your <span className="_lw_text">Active Directory ID</span>{" "}
                      is the ID you use to log in to your MetLife computer.
                    </small>
                  </p>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;


// if (token !== null) {
//   return <Navigate to="/" replace />;
// }

// const handleSubmit=async(values)=>{
//   try {
//     setIsloading(true);
//     const res = await userLogin(values);

//     if (res.data.status === false) {
//       // message.error(res.data.message);
//       setErrorMassage(res.data.message);
//       setIsloading(false);
//     }
//     const token = res.data.data.token;
//     const username = res.data.data.username;
//     localStorage.setItem("access-token", token);
//     const user = jwt_decode(token);
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("username", JSON.stringify(username));
//     window.location.href = "/";
//     message.success(res.data.message);
//     setIsloading(false);
//   } catch (error) {
//     error?.response?.data?.details[0] &&
//     message.error(error?.response?.data?.details[0])
//     setIsloading(false);
//   }
// }

