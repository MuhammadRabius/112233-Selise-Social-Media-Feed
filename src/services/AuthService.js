import axios from "axios";

const userLogin = (body) => {
//    return axios.post('/api/auth/login',body);
   return axios.post('/api/auth/token',body);
   
}

export {
    userLogin
}