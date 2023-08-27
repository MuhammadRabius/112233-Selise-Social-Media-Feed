import axios from "axios";

const userLogin = (body) => {
   return axios.post('/api/auth/login',body);
   
}

export {
    userLogin
}