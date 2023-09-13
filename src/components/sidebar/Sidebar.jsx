import React, { useContext } from 'react';
import logo from "../../assets/img/metlifelogo.png";
import { NavLink  } from "react-router-dom";
import { LogoutOutlined  } from "@ant-design/icons";
import "./sidebar.css";

const Sidebar = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const username = JSON.parse(localStorage.getItem("username"));
 

  const onLogoutClick = (e) => {
    localStorage.clear();
    window.location.replace("https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout")
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
      <NavLink to={"/"}><img src={logo} className="sidebar-logo" alt="logo" width={120} /></NavLink>
      </div>
      <div className="sidebar-userinfo mt-4 text-center text-white">
        <h6>{user === null ? "Test User" : user.name}</h6>
        <p className="user_display">{username}</p>
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
