// import React from "react";
// import logo from "../../assets/img/metlifelogo.png";
// import { NavLink } from "react-router-dom";
// import { LogoutOutlined } from "@ant-design/icons";
// import "./sidebar.css";
// import { RoleUIDashboard, clearCookies } from "../../global_state/action";
// import { userLogout } from "../../services/Services";
// import { message } from "antd";
// import { azureLogoutUrl } from "../../utility/Urls";

// const Sidebar = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const authority = JSON.parse(localStorage.getItem("authority"));

//   const onLogoutClick = async () => {
//     try {
//       const logout = await userLogout();
//       clearCookies();
//       window.location.href = azureLogoutUrl;
//       localStorage.clear();
//     } catch (error) {
//       error?.response?.data?.error &&
//         message.error(error?.response?.data?.error);
//     }
//   };

//   return (
//     <div className="sidebar-container" data-testid="sidebar-mock">
//       <div className="sidebar-header">
//         <NavLink to={"/dashboard"}>
//           <img src={logo} className="sidebar-logo" alt="logo" width={120} />
//         </NavLink>
//       </div>
//       <div className="sidebar-userinfo mt-4 text-center text-white">
//         <h6>{user === null ? "Test User" : user.name}</h6>
//         <p>{user === null ? "" : RoleUIDashboard(authority)}</p>
//       </div>

//       <div className="sidebar">
//         <nav className="sidebar-nav">
//           {authority === "ROLE_CALL_CENTER" ? (
//             <ul className="sidebar-nav-ul">
//               <li className="">
//                 <NavLink
//                   className={({ isActive, isPending }) =>
//                     isActive ? "nav-active" : ""
//                   }
//                   to={"/leads"}
//                 >
//                   &nbsp; Leads
//                 </NavLink>
//               </li>
//             </ul>
//           ) : (
//             <ul className="sidebar-nav-ul">
//               <li>
//                 <NavLink
//                   className={({ isActive, isPending }) =>
//                     isActive ? "nav-active" : ""
//                   }
//                   to={"/dashboard"}
//                 >
//                   &nbsp; Dashboard
//                 </NavLink>
//               </li>
//               <li className="">
//                 <NavLink
//                   className={({ isActive, isPending }) =>
//                     isActive ? "nav-active" : ""
//                   }
//                   to={"/leads"}
//                 >
//                   &nbsp; Leads
//                 </NavLink>
//               </li>

//               <li className="">
//                 <NavLink
//                   className={({ isActive, isPending }) =>
//                     isActive ? "nav-active" : ""
//                   }
//                   to={"/report"}
//                 >
//                   &nbsp; Report
//                 </NavLink>
//               </li>
//               {authority === "ROLE_ADMIN" && (
//                 <li className="">
//                   <NavLink
//                     className={({ isActive, isPending }) =>
//                       isActive ? "nav-active" : ""
//                     }
//                     to={"/usermanagement"}
//                   >
//                     &nbsp; User Management
//                   </NavLink>
//                 </li>
//               )}
//             </ul>
//           )}
//         </nav>
//       </div>

//       <div className="account-logout" onClick={onLogoutClick}>
//         <p>
//           <LogoutOutlined
//             style={{ color: "#007ABC", width: "11px", height: "16px" }}
//           />{" "}
//           Account Logout
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import logo from "../../assets/img/metlifelogo.png";
import onlylogo from "../../assets/img/Metlife_Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

import "./sidebar.css";
import { RoleUIDashboard, clearCookies } from "../../global_state/action";
import { userLogout } from "../../services/Services";
import { Avatar, message } from "antd";
import { azureLogoutUrl } from "../../utility/Urls";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { MenuItems, items } from "./SidebarKey";
import { UserOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const { Sider } = Layout;
  const user = JSON.parse(localStorage.getItem("user"));
  const authority = JSON.parse(localStorage.getItem("authority"));
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="sidebar-header">
          <NavLink to={"/dashboard"}>
            {collapsed === true ? (
              <img
                src={onlylogo}
                className="sidebar-logo"
                alt="logo"
                width={40}
              />
            ) : (
              <img src={logo} className="sidebar-logo" alt="logo" width={120} />
            )}
          </NavLink>
        </div>

        <div className="sidebar-userinfo mt-4 text-center text-white">
          {collapsed === true ? (
            <Avatar
              style={{
                backgroundColor:
                  "transparent linear-gradient(180deg, #007ABC 0%, #A4CE4E 100%) 0% 0% no-repeat padding-box",
                color: "white",
                marginLeft: "24%",
              }}
              size="large"
            >
              {user.name.charAt(0)}
            </Avatar>
          ) : (
            <>
              <div>
                <h6>{user === null ? "Test User" : user.name}</h6>
                <p>{user === null ? "" : RoleUIDashboard(authority)}</p>
              </div>
            </>
          )}
        </div>

        <Menu
          onClick={async ({ key }) => {
            if (key === "logout") {
              try {
                const logout = await userLogout();
                clearCookies();
                window.location.href = azureLogoutUrl;
                localStorage.clear();
              } catch (error) {
                error?.response?.data?.error &&
                  message.error(error?.response?.data?.error);
              }
              return;
            }
            navigate(key);
          }}
          // defaultSelectedKeys={"key"}
          // mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
