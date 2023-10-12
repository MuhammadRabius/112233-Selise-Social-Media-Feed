import axios from "axios";

const userLogin = (body) => {
  return axios.post("/api/auth/token", body);
};

const userLogout = () => {
  return axios.get("api/auth/logout");
};

export { userLogin, userLogout };
