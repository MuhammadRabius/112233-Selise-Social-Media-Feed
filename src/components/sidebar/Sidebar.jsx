import React from 'react';
import logo from "../../assets/img/metlifelogo.png";
import { NavLink  } from "react-router-dom";
import { LogoutOutlined  } from "@ant-design/icons";
import "./sidebar.css";

const Sidebar = () => {
  // const azureLogoutUrl ="https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fca56a4a5-e300-406a-98ff-7e36a0baac5b%2Foauth2%2Fv2.0%2Fauthorize%3Fclient_id%3D5a6f192a-8f85-4f86-8715-2efa16a9ea41%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fdev.ulm.metlife.com.bd%252F%26response_mode%3Dquery%26scope%3Dhttps%253A%252F%252Fgraph.microsoft.com%252Fuser.read%26sso_reload%3Dtrue";
  const azureLogoutUrl ="https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fca56a4a5-e300-406a-98ff-7e36a0baac5b%2Foauth2%2Fv2.0%2Fauthorize%3Fclient_id%3D5a6f192a-8f85-4f86-8715-2efa16a9ea41%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fdev.ulm.metlife.com.bd%252F%26response_mode%3Dquery%26scope%3Dhttps%253A%252F%252Fgraph.microsoft.com%252Fuser.read%26sso_reload%3Dtrue";
  const user = JSON.parse(localStorage.getItem("user"));
  const username = JSON.parse(localStorage.getItem("username"));
 
   
  const onLogoutClick = (e) => {
    localStorage.clear();
    window.location.href = azureLogoutUrl;
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
      <NavLink to={"/dashboard"}><img src={logo} className="sidebar-logo" alt="logo" width={120} /></NavLink>
      </div>
      <div className="sidebar-userinfo mt-4 text-center text-white">
        <h6>{user === null ? "Test User" : user.name}</h6>
      </div>

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-ul">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "nav-active" : ""
                }
                to={"/dashboard"}
              >
                &nbsp; Dashboard
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "nav-active" : ""
                }
                to={"/leads"}
              >
                &nbsp; Leads
              </NavLink>
            </li>
            

            <li className="">
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "nav-active" : ""
                }
                to={"/report"}
              >
                &nbsp; Report
              </NavLink>
            </li>
            
             <li className="">
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "nav-active" : ""
                }
                to={"/usermanagement"}
              >
                &nbsp; User Management
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    
      <div className="account-logout" onClick={onLogoutClick}>
      <p ><LogoutOutlined style={{color:"#007ABC",width:"11px",height:"16px"}}/> Account Logout</p>
    
      </div>
    </div>
  );
};

export default Sidebar;
