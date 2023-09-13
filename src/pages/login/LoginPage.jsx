import { useState } from "react";
import "./loginPage.css";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import logo from "../../assets/img/metlifelogo.png";
import { userLogin } from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { Navigate} from "react-router-dom";
import TextInput from "../../components/inputs/TextInput";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";

const LoginPage = ({isLoad}) => {
  const [isLoading, setLoading] = useState(
    false 
  );
  const [errorMessage,setErrorMassage]=useState('')



  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(5, "Password must be 5 characters at minimum")
      .required("Password is required"),
  });

  const token = localStorage.getItem("access-token");

  if (token !== null) {
    return <Navigate to="/" replace />;
  }

  // Spin
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
      />
      );
      
      return <>
     {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : 
    <div className="login-container">
      <div className="login-card">
        <div className="metlife-logo mt-4">
          <img src={logo} width={120} alt="logo" />
        </div>

        <h6 className="sign_text" >
          Sign into your account
        </h6>
        <p className="enter_text mt-2 mb-5">
          <small> Enter your Active Directory ID</small>
        </p>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              setLoading(isLoad === "false" ? false : true);
              const res = await userLogin(values);
              if (res.data.status === false) {
                // message.error(res.data.message);
                setErrorMassage(res.data.message)
                setLoading(false);
              }
              const token = res.data.data.token;
              const username = res.data.data.username;
              localStorage.setItem("access-token", token);
              const user = jwt_decode(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("username", JSON.stringify(username));
              window.location.href = "/";
              message.success(res.data.message);
              setLoading(false);
              
            } catch (e) {
              setLoading(false);
              message.error(e.res.data.message);
            
            }
          }}
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
             {
              errorMessage && <div data-testid="login-error"><p id="error"  style={{marginTop:'20px',color:'red'}}>{errorMessage}</p></div>  
             }
              <button
                type="submit"
                disabled={isLoading}
                className="login-button "
              >
                LOGIN
              </button> 
              
              <p className="mt-3">
                <small className="__lw_text">
                  Your <span className="_lw_text">Active Directory ID</span> is
                  the ID you use to log in to your MetLife computer.
                </small>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
        }
   
  </>;
};

export default LoginPage;


