import {
  LogoutOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  
  
} from "@ant-design/icons";
const authority = JSON.parse(localStorage.getItem("authority"));

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AdminItems = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("Leads", "/leads", <DesktopOutlined />),
  getItem("Report", "/report", <FileOutlined />),
  getItem("User Management", "/usermanagement", <TeamOutlined />),
  getItem("Account Logout", "logout", <LogoutOutlined />),
];

const Call_Center_items = [
  getItem("Leads", "/leads", <DesktopOutlined />),
  getItem("Account Logout", "logout", <LogoutOutlined />),
];
const Business_Admin_Items = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("Leads", "/leads", <DesktopOutlined />),
  getItem("Report", "/report", <UserOutlined />),
  getItem("Account Logout", "logout", <LogoutOutlined />,),
];

export const items =
  authority === "ROLE_CALL_CENTER"
    ? Call_Center_items
    : authority === "ROLE_ADMIN"
    ? AdminItems
    : Business_Admin_Items;
