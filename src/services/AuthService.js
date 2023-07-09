import axios from "axios";

const userLogin = (body) => {
   return axios.post('/signin',body);
   
}

export {
    userLogin
}