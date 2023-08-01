import { useState,useContext } from "react";
import "./loginPage.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/img/metlifelogo.png";
import { userLogin } from "../../services/AuthService";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import { Navigate,useNavigate,useHistory} from "react-router-dom";
import TextInput from "../../components/inputs/TextInput";
import { UserContext } from "../../components/Context/UserContext";

const LoginPage = () => {
  const { setUserData } = useContext(UserContext);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();



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

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="metlife-logo mt-4">
          <img src={logo} width={120} alt="logo" />
        </div>

        <h6 className="text-center mt-4" style={{ margin: "0" }}>
          Sign into your account
        </h6>
        <p className="text-center">
          <small> Enter your Active Directory ID</small>
        </p>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              setIsloading(true);
              const res = await userLogin(values);
              setUserData(res.data.data)
              if (res.status === 200) {
                const token = res.data.data.token;
                const username = res.data.data.username;
                localStorage.setItem("access-token", token);
                const user = jwt_decode(token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("username", JSON.stringify(username));
                window.location.href = "/";
                message.success(res.data.message);
                
              }
              setIsloading(false);
            } catch (e) {
              message.success(e.message);
              setIsloading(false);
              console.log(e);
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
  );
};

export default LoginPage;
