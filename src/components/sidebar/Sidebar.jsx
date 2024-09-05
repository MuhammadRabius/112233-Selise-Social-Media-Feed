
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
