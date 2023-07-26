import axios from "axios";

const userLogin = (body) => {
   return axios.post('/api/users/sign-in',body);
   
}

export {
    userLogin
}