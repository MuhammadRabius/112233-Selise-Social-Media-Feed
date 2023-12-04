import React from "react";
import { Button, Modal, message } from "antd";
import "./LogoutModal.css";
import { clearCookies } from "../../global_state/action";

const LogoutModal = ({ open }) => {
  const azureLogoutUrl = `https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read`;

  const onLogoutClick = async () => {
    try {
      clearCookies();
      window.location.href = azureLogoutUrl;
      localStorage.clear();
    } catch (error) {
      error?.response?.data?.error &&
        message.error(error?.response?.data?.error);
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
        <p style={{ textAlign: "center" }}>
          Your session has been running out.{" "}
          <span style={{ color: "red" }}>Please login again.</span>
        </p>
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
