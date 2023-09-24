import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import Loader from "../../../components/loader/Loader";
import "./UpdateUser.css";
import { userUpdateInformation } from "../Service/um_service";
const UpdateUserModal = ({
  open,
  onCancel,
  userId,
  setUserUpdate,
  callBack,
  setCallBack,
  isLoading,
  department,
  location,
  role,
}) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    roleId: null,
    departmentId: null,
    locationId: null,
  });

  // Submission payload-------------

  // Update All and Exit Call
  const onFinish = async () => {
    const payload = {
      username: userData?.username,
      email: userData?.email,
      roleId: userData?.roleId,
      departmentId: userData?.departmentId,
      locationId: userData?.locationId,
    };

    try {
      setLoading(true);
      const res = await userUpdateInformation(userId, payload);
      message.success(res.data.message);
      setCallBack(!callBack);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Data Fetching by ID
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

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
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <div className="um_modal_body">
            <Form form={form} onFinish={onFinish} autoComplete="off">
              <Form.Item name="lastName" noStyle>
                {" "}
                <Input
                  className="selectChange"
                  placeholder="Username"
                  value={userData?.username}
                  disabled
                />
              </Form.Item>

              {userData?.districtName === null ? (
                <small style={{ color: "red" }}>Please Select District</small>
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

              <Form.Item name="email" noStyle>
                {" "}
                <Input
                  className="selectChange"
                  type="text"
                  placeholder="Email"
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Item>

              {userData?.districtName === null ? (
                <small style={{ color: "red" }}>Please Select District</small>
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

              {userData?.districtName === null ? (
                <small style={{ color: "red" }}>Please Select District</small>
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
        )}
      </Modal>
    </>
  );
};

export default UpdateUserModal;
