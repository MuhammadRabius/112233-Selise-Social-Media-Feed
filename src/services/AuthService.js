import axios from "axios";

const userLogin = (body) => {
  return axios.post("/api/auth/token", body);
};

export { userLogin };
