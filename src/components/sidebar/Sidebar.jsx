import "./sidebar.css";
import logo from "../../assets/img/metlifelogo.png";
import { Link, NavLink, Navigate } from "react-router-dom";
const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
        <p style={{ color: "#F2F2F2" }}>Lorem Ipsum</p>
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
                to={"/leadsubmission"}
              >
                &nbsp; Leads Submission
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
        Account Logout
      </div>
    </div>
  );
};

export default Sidebar;
