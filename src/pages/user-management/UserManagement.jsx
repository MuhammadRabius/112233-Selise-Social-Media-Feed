import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Input, Form, Select, Table, message, Switch } from "antd";
import { NavLink } from "react-router-dom";
import { debounce } from "lodash";
import Loader from "../../components/loader/Loader";
import "./UserManagement.css";
import UpdateUserModal from "./UpdateUserModal/UpdateUserModal";
import LogoutModal from "../../components/SessionOutModal/LogoutModal";
import {
  createUser,
  getDepartment,
  getLocations,
  userActiveStatus,
  userList,
  getRole,
} from "../../services/Services";
   
const UserManagement = () => {
  const username = JSON.parse(localStorage.getItem("username"));
  const [logoutModal, setLogoutModal] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [callBack, setCallBack] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState([]);
  const [activeStatus, setUserActiveInactive] = useState(null);
  const [activeId, setActiveId] = useState("");
  const antIcon = <Loader isLoading={true} />;
  const [searchInput, setSearchInput] = useState("");

  const [addUser, setAddUser] = useState({
    username: "",
    email: "",
    roleId: "",
    departmentId: "",
    locationId: "",
  });

  // add lead component
  const [userUpdate, setUserUpdateModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const showModal = (id) => {
    setUserId(id);
    setUserUpdateModal(true);
  };

  const debouncedSearch = debounce((s_value) => {
    setSearchInput(s_value);
  }, 1000);

  const onStatusClicked = async (v, id) => {
    setUserActiveInactive(v);
    setActiveId(id);
    try {
      const userStatus = await userActiveStatus(id);
      setCallBack(!callBack);
    } catch (err) {}
  };

  const onTableChange = (sorter) => {
    setSortedInfo(sorter);
  };

  const serial = Array.from({ length: 1000000 }, (_, index) => ({
    sl: index + 1,
  }));
  const dataWithSerial = user.map((item, index) => ({
    ...item,
    ...serial[index],
  }));

  const onFinish = async (values) => {
    const payload = {
      username: values?.username,
      email: values?.email,
      roleId: addUser?.roleId,
      departmentId: addUser?.departmentId,
      locationId: addUser?.locationId,
    };

    try {
      setLoading(true);
      const res = await createUser(payload);
      message.success(res.data.message);
      setCallBack(!callBack);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error?.response?.status === 401) {
        setLogoutModal(true);
        setLoading(false);
      }
      error?.response?.data?.details[0] &&
        message.error(error?.response?.data?.details[0]);
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const districtDisplay = await getLocations();
        setLocation(districtDisplay.data.data);

        const locationDisplay = await getDepartment();
        setDepartment(locationDisplay.data.data);

        const roleDisplay = await getRole();
        setRole(roleDisplay.data.data);
        //
        const userDisplay = await userList(searchInput);
        setUser(userDisplay.data.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response.status !== 200) {
          setLogoutModal(true);
        }
      }
    })();

    return () => ac.abort();
  }, [callBack, searchInput]);

  const [sortedInfo, setSortedInfo] = useState({});

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      sorter: (a, b) => a.sl - b.sl,
      sortOrder: sortedInfo.columnKey === "sl" ? sortedInfo.order : null,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a?.username?.length - b?.username?.length,
      sortOrder: sortedInfo.columnKey === "username" ? sortedInfo.order : null,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a?.role?.length - b?.role?.length,
      sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a?.email?.length - b?.email?.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => a?.department?.length - b?.department?.length,
      sortOrder:
        sortedInfo.columnKey === "department" ? sortedInfo.order : null,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a?.location?.length - b?.location?.length,
      sortOrder: sortedInfo.columnKey === "location" ? sortedInfo.order : null,
    },
    {
      title: "Edit",
      dataIndex: "action",
      key: "key",
      render: (states, _data) => {
        return _data?.username === "SystemUser" ||
          _data.username === username ? null : (
          <>
            <NavLink onClick={(e) => showModal(_data.userId)}>Edit</NavLink>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "active",
      key: "active",
      render: (active, _data) => {
        return _data?.username === "SystemUser" ||
          _data.username === username ? null : (
          <>
            <Switch
              checked={_data?.active}
              onClick={(v) => onStatusClicked(v, _data.userId)}
              loading={isLoading}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Layout pageName={"User Management"}>
        <p className="bt_Text" data-testid="um-mock">
          User Management
        </p>

        <div className="um_container">
          <Form
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="um_form">
              <Form.Item
                label=""
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter username!",
                  },
                ]}
              >
                <Input
                  className="input_group"
                  placeholder="Username"
                  data-testid="username-mock"
                />
              </Form.Item>

              <Form.Item
                name="department"
                label=""
                rules={[
                  {
                    required: true,
                    message: "Please Select Department",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Department"
                  data-testid="dep-mock"
                  optionFilterProp="label"
                  value={addUser.departmentId}
                  onChange={(value) =>
                    setAddUser({
                      ...addUser,
                      departmentId: value,
                    })
                  }
                >
                  {department.map((_d) => {
                    return (
                      <>
                        <Option key={_d.id} value={_d.id} label={_d.name}>
                          {_d.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label=""
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input valid email",
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input
                  className="input_group"
                  placeholder="Email"
                  data-testid="email-mock"
                />
              </Form.Item>
              <Form.Item
                name="location"
                label=""
                rules={[
                  {
                    required: true,
                    message: "Please Select Location!",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Role"
                  data-testid="role-mock"
                  optionFilterProp="label"
                  value={addUser.roleId}
                  onChange={(value) =>
                    setAddUser({
                      ...addUser,
                      roleId: value,
                    })
                  }
                >
                  {role.map((_d) => {
                    return (
                      <>
                        <Option key={_d.id} value={_d.id} label={_d.name}>
                          {_d.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="role"
                label=""
                rules={[
                  {
                    required: true,
                    message: "Please Select Role",
                  },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Location"
                  data-testid="location-mock"
                  optionFilterProp="label"
                  value={addUser.locationId}
                  onChange={(value) =>
                    setAddUser({
                      ...addUser,
                      locationId: value,
                    })
                  }
                >
                  {location.map((_d) => {
                    return (
                      <>
                        <Option key={_d.id} value={_d.id} label={_d.name}>
                          {_d.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="f_btn">
              <Form.Item>
                <button className="create_btn" htmlType="submit">
                  CREATE USER
                </button>
              </Form.Item>
            </div>
          </Form>

          <div className="lead-search">
            <input
              onChange={(e) => debouncedSearch(e.target.value)}
              placeholder="Search by username,email....  "
              className="filterlead"
            />
          </div>
          {/* user Table View---------- */}
          <div className="um_table">
            <div>
              <Table
                rowKey={user.id}
                onChange={onTableChange}
                columns={columns}
                dataSource={dataWithSerial}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </Layout>

      {UpdateUserModal && (
        <UpdateUserModal
          key={userId}
          userId={userId}
          open={userUpdate}
          setUpdateLeadModal={setUserUpdateModal}
          callBack={callBack}
          setCallBack={setCallBack}
          role={role}
          location={location}
          department={department}
        />
      )}
      {logoutModal && (
        <LogoutModal open={logoutModal} setLogoutModal={setLogoutModal} />
      )}
    </>
  );
};

export default UserManagement;
