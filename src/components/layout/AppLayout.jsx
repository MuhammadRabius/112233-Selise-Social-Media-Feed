import Sidebar from "../sidebar/Sidebar";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout.css";
import { useState } from "react";
const AppLayout = ({ children, pageName, manuColp }) => {
  const { Sider } = Layout;
  const user = JSON.parse(localStorage.getItem("user"));
  const authority = JSON.parse(localStorage.getItem("authority"));
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout" data-testid="app-layout-mock">
      <Sidebar />
      <div className="layout-container" data-testid="layout-mock">
        <ToastContainer position="top-right" autoClose={5000} />
        <h6 className="pt-4" style={{ color: "#75787B" }}>
          {pageName}
        </h6>
        <div className="layout-children-container">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
