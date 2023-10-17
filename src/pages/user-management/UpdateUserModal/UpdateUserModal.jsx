import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Spin } from "antd";
import "./UpdateUser.css";

import {
  LocManage,
  StringManaged,
  depManage,
  roleManage,
} from "../../../global_state/action";
import { userUpdateInformation,userById } from "../../../services/Services";
const UpdateUserModal = ({
  open,
  onCancel,
  userId,
  setUpdateLeadModal,
  callBack,
  setCallBack,
  isLoading,
  department,
  location,
  role,
}) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setUpdateLeadModal(false);
  };

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    roleId: null,
    departmentId: null,
    locationId: null,
  });


  const onFinish = async () => {
    const payload = {
      username: userData?.username,
      email: userData?.email,
      roleId: userData?.roleId?.length
        ? StringManaged(role, userData?.roleId)
        : userData?.roleId,
      departmentId: userData?.departmentId?.length
        ? StringManaged(department, userData?.departmentId)
        : userData?.departmentId,
      locationId: userData?.locationId?.length
        ? StringManaged(location, userData?.locationId)
        : userData?.locationId,
    };

    try {
      setLoading(true);
      const res = await userUpdateInformation(userId, payload);
      message.success(res.data.message);
      setCallBack(!callBack);
      form.resetFields();
      setUpdateLeadModal(false);
      setLoading(false);
    } catch (error) {
      error?.response?.data?.details[0] && message.error(error?.response?.data?.details[0]);
      setLoading(false);
    }
  };


  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        if(userId !== null){
        const userDisplay = await userById(userId);
          setUserData({
            ...userData,
            username: userDisplay?.data?.data?.username,
            email: userDisplay?.data?.data?.email,
            roleId: userDisplay?.data?.data?.role,
            departmentId: userDisplay?.data?.data?.department,
            locationId: userDisplay?.data?.data?.location,
          });
        } 

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [callBack, userId]);

  return (
    <>
      <Modal
        className="addLeadModal"
        key={userId}
        title="Update User Information"
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Spin spinning={loading}>
          <div className="um_modal_body">
            <Form
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item name="username" noStyle>
                {" "}
                <Input
                  className="selectChange"
                  placeholder="Username"
                  value={userData?.username}
                  readOnly
                />
              </Form.Item>

              {userData?.departmentId === null ? (
                <small style={{ color: "red" }}>Please Select Department</small>
              ) : null}

              <Select
                className="selectChange"
                allowClear
                showSearch
                value={userData?.departmentId}
                onChange={(value) =>
                  setUserData({
                    ...userData,
                    departmentId: value,
                  })
                }
                placeholder="Department"
                optionFilterProp="label"
                options={department.map((_d) => ({
                  label: _d?.name,
                  value: _d?.id,
                }))}
              />

              <Form.Item
                name="email"
                rules={[
                  {
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                    message: "Invalid email address.",
                  },
                ]}
              >
                {" "}
                <Input
                  className="selectChange"
                  type="email"
                  placeholder="Email"
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </Form.Item>

              {userData?.roleId === null ? (
                <small style={{ color: "red" }}>Please Select Role</small>
              ) : null}

              <Select
                className="selectChange"
                allowClear
                showSearch
                placeholder="Role"
                value={userData?.roleId}
                onChange={(value) =>
                  setUserData({
                    ...userData,
                    roleId: value,
                  })
                }
                optionFilterProp="label"
                options={role.map((_d) => ({
                  label: _d?.name,
                  value: _d?.id,
                }))}
              />

              {userData?.locationId === null ? (
                <small style={{ color: "red" }}>Please Select Location</small>
              ) : null}

              <Select
                className="selectChange"
                allowClear
                showSearch
                placeholder="Location"
                value={userData?.locationId}
                onChange={(value) =>
                  setUserData({
                    ...userData,
                    locationId: value,
                  })
                }
                optionFilterProp="label"
                options={location.map((_d) => ({
                  label: _d?.name,
                  value: _d?.id,
                }))}
              />

              <Form.Item>
                <div className="sub_btn_group">
                  <button htmlType="submit" className="sub_btn">
                    Update
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
