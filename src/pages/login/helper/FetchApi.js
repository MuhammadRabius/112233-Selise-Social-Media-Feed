import React, { useEffect, useState } from "react";
import { userLogin } from "../../../services/AuthService";
import jwt_decode from "jwt-decode";
import { message } from "antd";

const FetchApi = ({payload,setStatus,setLoading}) => {
    const azureLogoutUrl ="https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fca56a4a5-e300-406a-98ff-7e36a0baac5b%2Foauth2%2Fv2.0%2Fauthorize%3Fclient_id%3D5a6f192a-8f85-4f86-8715-2efa16a9ea41%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fdev.ulm.metlife.com.bd%252F%26response_mode%3Dquery%26scope%3Dhttps%253A%252F%252Fgraph.microsoft.com%252Fuser.read%26sso_reload%3Dtrue";
    useEffect(() => {
        

        if(payload){
         (async () => {
           try {
             setLoading(true);
             const res = await userLogin(payload);
            
             if (res.data.status === true) {
               setStatus(200)
               const token = res.data.data.token;
               const username = res.data.data.username;
               localStorage.setItem("access-token", token);
               const user = jwt_decode(token);
               localStorage.setItem("user", JSON.stringify(user));
               localStorage.setItem("username", JSON.stringify(username));
               window.location.href = "/dashboard";
               message.success(res.data.message);
               setLoading(false)
               return;
             }        
             
           } catch (error) {
             setLoading(false);
             setTimeout(() => {
               window.location.href=azureLogoutUrl
             }, 2000);
     
             // error?.response?.data?.details[0] &&
             //   message.error(error?.response?.data?.details[0]);
           }
         })();
        }
       }, [payload]);
};

export default FetchApi;