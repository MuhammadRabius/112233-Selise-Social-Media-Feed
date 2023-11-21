import React from "react";
import { Button, Modal, message } from "antd";
import "./LogoutModal.css";
import { clearCookies } from "../../global_state/action";
import { azureLogoutUrl } from "../../utility/Urls";
const LogoutModal = ({ open }) => {
 

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
