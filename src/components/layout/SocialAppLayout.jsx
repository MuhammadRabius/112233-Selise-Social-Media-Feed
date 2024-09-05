import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { feed_menu } from "./assests/feed_menu_data";
import "./layout.css";
const { Header, Content, Footer } = Layout;
const SocialAppLayout = ({ isMenu = false, props, children , handleOnClick=()=>{}}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="feed_container">
        <div className="demo-logo" />

        {isMenu && (
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={(value) => handleOnClick(value)}
            items={feed_menu}
            className="nav_contents"
          />
        )}
      </Header>

      <Content
        style={{
          padding: "0 48px",
          margin: "16px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: "50%",
            justifyContent: "center",
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};

export default SocialAppLayout;
