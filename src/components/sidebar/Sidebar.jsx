import React, { useContext } from 'react';
import "./sidebar.css";
import logo from "../../assets/img/metlifelogo.png";
import { Link, NavLink, Navigate } from "react-router-dom";
import { LogoutOutlined  } from "@ant-design/icons";
import { UserContext } from '../Context/UserContext';
const Sidebar = () => {
  const { userData } = useContext(UserContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = JSON.parse(localStorage.getItem("username"));
 

  const onLogoutClick = (e) => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={logo} className="sidebar-logo" alt="logo" width={120} />
      </div>
      <div className="sidebar-userinfo mt-4 text-center text-white">
        <h6>{user === null ? "Test User" : user.name}</h6>
        <p style={{ color: "#F2F2F2" , fontSize:'14px',textTransform: "capitalize" }}>{username}</p>
      </div>

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-ul">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "nav-active" : ""
                }
                to={"/"}
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
      <LogoutOutlined style={{color:"#007ABC",width:"11px",height:"16px"}}/> Account Logout
      </div>
    </div>
  );
};

export default Sidebar;
