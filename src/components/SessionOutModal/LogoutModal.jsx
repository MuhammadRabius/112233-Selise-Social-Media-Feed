import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import "./LogoutModal.css";
import { userLogout } from "../../services/AuthService";
const LogoutModal = ({ open, setLogoutModal }) => {
  const azureLogoutUrl =
    "https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fca56a4a5-e300-406a-98ff-7e36a0baac5b%2Foauth2%2Fv2.0%2Fauthorize%3Fclient_id%3D5a6f192a-8f85-4f86-8715-2efa16a9ea41%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fdev.ulm.metlife.com.bd%252F%26response_mode%3Dquery%26scope%3Dhttps%253A%252F%252Fgraph.microsoft.com%252Fuser.read%26sso_reload%3Dtrue";

  const onLogoutClick = async (e) => {
    localStorage.clear();
    try {
      const logout = await userLogout()
      window.location.href = azureLogoutUrl;
    
    } catch (error) {
      error?.response?.data?.error && message.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Modal
        className="logoutModal"
        title="Session Timeout"
        footer={false}
        open={open}
      >
        <p style={{ textAlign: "center" }}>Your session has been running out. <span style={{ color: "red" }}>Please login again.</span></p>
        <div style={{ textAlign: "end" }}>
          <Button className="logoutBtn" onClick={onLogoutClick}>
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
