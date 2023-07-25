import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Input, Form, Select, Table, message } from "antd";
import { NavLink } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import "./UserManagement.css";
import {
  getDistrict,
  getRole,
  getDepartment,
  userList,
  createUser,
} from "./Service/um_service";
const { Option } = Select;
const { Search } = Input;
const UserManagement = () => {
  const [form] = Form.useForm();
  const [callBack, setCallBack] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Data Fetching
  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState([]);

  console.log("user",user)
  // Search Compnent
  const onSearchClick = (e) => {
    console.log("search click");
  };
  const onFinish = (values) => {

    console.log("values", values);

    const payload={
      "username": values.username,
      "email": values.email,
      "roleId": values.role,
      "departmentId": values.department,
      "locationId": values.location
    }

    try {
      (async () => {
       
        setLoading(true);
          
          const res = await createUser(payload)
          message.success(res.data.message)
          setCallBack(!callBack)
          setLoading(false);
        
        // saveAsXlsxFile(fileData)
       
        
      })();
    } catch (error) {
      console.log(error.message);
      // err.respose.data.message && message.error(err.respose.data.message)
    }
  };

  // Page Pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  //  api calling ---
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        //
        const districtDisplay = await getDistrict();
        setLocation(districtDisplay.data.data);
        //
        const locationDisplay = await getDepartment();
        setDepartment(locationDisplay.data.data);
        //
        const roleDisplay = await getRole();
        setRole(roleDisplay.data.data);
        //
        const userDisplay = await userList();
        
        setUser(userDisplay.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Something went wrong");
      }
    })();

    return () => ac.abort();
  }, [callBack]);

  const columns = [
    {
      title: "SL",
      dataIndex: "key",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (states) => <NavLink>Edit</NavLink>,
    },
  ];
  

  return (
    <>
      <Layout pageName={"User Management"}>
        <p className="bt_Text">User Management</p>

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
                <Input className="input_group" placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="department"
                label=""
                rules={[
                  {
                    required: true,
                    message: "Please Select Department!",
                  },
                ]}
              >
                <Select allowClear showSearch placeholder="Department!">
                  {department.map((_d) => {
                    
                    return (
                      <>
                        <Option key={_d.id} value={_d.id}>
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
                    message: "Please input valid email!",
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input className="input_group" placeholder="Email" />
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
              <Select allowClear showSearch placeholder="Role!">
              {role.map((_d) => {
               
                return (
                  <>
                    <Option key={_d.id} value={_d.id}>
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
                    message: "Please Select Role!",
                  },
                ]}
              >
              <Select allowClear showSearch placeholder="Location!">
              {location.map((_d) => {
                
                return (
                  <>
                    <Option key={_d.id} value={_d.id}>
                      {_d.labelEnglish}
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
                  placeholder="Search by Phone no.  "
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
                columns={columns}
                dataSource={user}
              
                loading={isLoading}
              />
            </div>
          </div>

          {/* Lead Generation Pagination */}
          <div className="pgn_ld_sb">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={120}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserManagement;

// Demo Data ---------

const columns = [
  {
    title: "SL",
    dataIndex: "key",
  },
  {
    title: "Usename",
    dataIndex: "Usename",
  },
  {
    title: "Role",
    dataIndex: "Role",
  },
  {
    title: "Email",
    dataIndex: "Email",
  },
  {
    title: "Department",
    dataIndex: "Department",
  },
  {
    title: "Location",
    dataIndex: "Department",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (states) => <NavLink>Edit</NavLink>,
  },
];
