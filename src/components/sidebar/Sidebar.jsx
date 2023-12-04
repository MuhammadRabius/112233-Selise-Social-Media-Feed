import React from "react";
import logo from "../../assets/img/metlifelogo.png";
import { NavLink } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import "./sidebar.css";
import { RoleUIDashboard, clearCookies } from "../../global_state/action";
import { userLogout } from "../../services/Services";
import { message } from "antd";

const Sidebar = () => {
  const azureLogoutUrl = `https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read`;
  const user = JSON.parse(localStorage.getItem("user"));
  const authority = JSON.parse(localStorage.getItem("authority"));

  const onLogoutClick = async () => {
    try {
      const logout = await userLogout();
      clearCookies();
      window.location.href = azureLogoutUrl;
      localStorage.clear();
    } catch (error) {
      error?.response?.data?.error &&
        message.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="sidebar-container" data-testid="sidebar-mock">
      <div className="sidebar-header">
        <NavLink to={"/dashboard"}>
          <img src={logo} className="sidebar-logo" alt="logo" width={120} />
        </NavLink>
      </div>
      <div className="sidebar-userinfo mt-4 text-center text-white">
        <h6>{user === null ? "Test User" : user.name}</h6>
        <p>{user === null ? "" : RoleUIDashboard(authority)}</p>
      </div>

      <div className="sidebar">
        <nav className="sidebar-nav">
          {authority === "ROLE_CALL_CENTER" ? (
            <ul className="sidebar-nav-ul">
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
            </ul>
          ) : (
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
              {authority === "ROLE_ADMIN" && (
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
              )}
            </ul>
          )}
        </nav>
      </div>

      <div className="account-logout" onClick={onLogoutClick}>
        <p>
          <LogoutOutlined
            style={{ color: "#007ABC", width: "11px", height: "16px" }}
          />{" "}
          Account Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
