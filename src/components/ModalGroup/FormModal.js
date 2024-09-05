import React, { useState } from "react";
import { Button, Modal } from "antd";

const FormModal = ({
  isModalOpen,
  setIsModalOpen,
  title = "",
  children,
  data,
}) => {
  let fakeDB = [];
  console.log("fakeDB", fakeDB);
  const handleOk = () => {
    try {
      console.log("data", data);
      localStorage.setItem("fakeDB", JSON.stringify(...fakeDB,...data));
      fakeDB.push(data);
    } catch (error) {
      console.log("error", error);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    const storedArray = JSON.parse(localStorage.getItem("fakeDB"));
    console.log("storedArray",storedArray);
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
export default FormModal;
