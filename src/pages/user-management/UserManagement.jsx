import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Input, Form, Select, Table, message, Spin, Switch } from "antd";
import { NavLink } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import "./UserManagement.css";
import {
  getLocations,
  getRole,
  getDepartment,
  userList,
  createUser,
  userActiveStatus,
} from "./Service/um_service";
import UpdateUserModal from "./UpdateUserModal/UpdateUserModal";

const UserManagement = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [callBack, setCallBack] = useState(false);
  const [isLoading, setLoading] = useState(
    props.isLoad === "false" ? false : true
  );
  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState([]);
  const [activeStatus, setUserActiveInactive] = useState(null);
  const [activeId, setActiveId] = useState("");
  const antIcon = <Loader isLoading={true} />;

  // add lead component
  const [userUpdate, setUserUpdate] = useState(false);
  const [userId, setUserId] = useState(0);
  const showModal = (id) => {
    setUserId(id);
    setUserUpdate(true);
  };

  const onStatusClicked = async (v, id) => {
    setUserActiveInactive(v);
    setActiveId(id);
    try {
      const userStatus = await userActiveStatus(id);
      setCallBack(!callBack);
    } catch (err) {
      console.log("data ", v, id);
    }
  };

  // Search Compnent
  const onSearchClick = (e) => {
    // console.log("search click");
  };
  const onFinish = (values) => {
    const payload = {
      username: values?.username,
      email: values?.email,
      roleId: values?.role,
      departmentId: values?.department,
      locationId: values?.location,
    };

    try {
      (async () => {
        setLoading(props.isLoad === "false" ? false : true);

        const res = await createUser(payload);
        message.success(res.data.message);
        setCallBack(!callBack);
        form.resetFields();
        setLoading(false);
      })();
    } catch (error) {
      setLoading(false);
      // err.respose.data.message && message.error(err.respose.data.message)
    }
  };

  //  api calling ---
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(props.isLoad === "false" ? false : true);
        //location dropdown calling
        const districtDisplay = await getLocations();
        setLocation(districtDisplay.data.data);
        //department dropdown calling
        const locationDisplay = await getDepartment();
        setDepartment(locationDisplay.data.data);
        // role dropdown calling
        const roleDisplay = await getRole();
        setRole(roleDisplay.data.data);
        //
        const userDisplay = await userList();
        setUser(userDisplay.data.data);
        
        // const userStatus = await userActiveStatus(activeId);
        // setUserActiveInactive(userStatus?.data?.data?.active);
        
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [callBack]);

  // sorting
  const [sortedInfo, setSortedInfo] = useState({});
  // Table Data
  const onTableChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };

  const serial = Array.from({ length: 1000000 }, (_, index) => ({
    sl: index + 1,
  }));
  const dataWithSerial = user.map((item, index) => ({
    ...item,
    ...serial[index],
  }));

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
        return _data?.username !== "SystemUser" ? (
          <>
            <NavLink onClick={(e) => showModal(_data.userId)}>Edit</NavLink>
          </>
        ) : null;
      },
    },
    {
      title: "Action",
      dataIndex: "active",
      key: "active",
      render: (states, _data) => {
      
        return ( 
          <Switch
          checked={_data?.active}
          onClick={(v) => onStatusClicked(v, _data.userId)}
          loading={isLoading}
        />
          )
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <Spin indicator={antIcon} loading={isLoading} />
      ) : (
        <>
          {" "}
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

                <div className="um_f_part">
                  <div className="lead-search">
                    <input
                      placeholder="Search by username/email  "
                      className="filterlead"
                      type="text"
                      name="fname"
                    />
                    <span style={{ cursor: "pointer" }} onClick={onSearchClick}>
                      <i
                        className="pi pi-search"
                        style={{ color: "var(--primary-color)" }}
                      ></i>
                    </span>
                  </div>

                  <div className="f_btn">
                    <Form.Item>
                      <button className="create_btn" htmlType="submit">
                        CREATE USER
                      </button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
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

              {/*  Pagination */}
            </div>
          </Layout>
        </>
      )}

      {UpdateUserModal && (
        <UpdateUserModal
          key={userId}
          userId={userId}
          open={userUpdate}
          onCancel={() => setUserUpdate(false)}
          setUpdateLeadModal={setUserUpdate}
          callBack={callBack}
          setCallBack={setCallBack}
          role={role}
          location={location}
          department={department}
        />
      )}
    </>
  );
};

export default UserManagement;
