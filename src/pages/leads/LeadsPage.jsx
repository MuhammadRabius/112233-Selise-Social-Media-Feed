import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import moment from 'moment';
import { Paginator } from "primereact/paginator";
import {
  Table,
  Radio,
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Pagination,
} from "antd";
import UploadModal from "./CustomModal/UploadModal";
import LeadUpdateModal from './LeadUpdateModal';
import {
  getDistrict,
  submitLeadManual,
  leadList,
} from "./Service/lead_service";
import "./LeadPage.css";

const LeadsPage = () => {
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [callBack, setCallBack] = useState(false);

  

  // Search by Phonee
  const [filterDate, setFilterData] = useState([]);
  const onSearchPhone = (e) => {
    const _s_v = e.target.value;
    setFilterData(_s_v);
  };
  const onSearchClick = (e) => {
    // const filterTable = data.filter(data.mn === filterDate);
    // console.log("filter phone", filterTable);
  };

  // Modal Section ----------

  // Bulk component
  const [isBulkModal, setBulkUpModal] = useState(false);

  const showBUModal = () => {
    setBulkUpModal(true);
  };


  // add lead component
  const [addLead, setAddLead] = useState(false);
  const showADModal = () => {
    setAddLead(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setAddLead(false);
  };

  // Modal On Submit -------

  // setup Field Data from API
  const [districtAPI, setDistrictAPI] = useState([]);
  const [singleLeadSubmit, setSingleLeadSubmit] = useState([]);
  const [leadListView, setLeadListView] = useState([]);

  // Table Sorting
  const [sortedInfo, setSortedInfo] = useState({});

  const setcontactNoSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "contactNo",
    });
  };

  // Form Field onChange Setup-----
  const [fname, setFName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [faq, setFAQ] = useState("");
  const [remark, setRemak] = useState("");
  const [district, setDistrict] = useState("");
  const [findPolicy, setPolicyNumber] = useState("");



  const handleName = (e) => {
    setFName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleFAQ = (e) => {
    setFAQ(e.target.value);
  };
  const handleRemrk = (e) => {
    setRemak(e.target.value);
  };
  // District ----
  const onDistrictChange = (values) => {
    setDistrict(values);
  };

  // Radio FAQ
  const [value, setValue] = useState("yes");
  const onFAQChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  
  // Find On Set Data----
  const onPolicySearch = (_v) => {
    setPolicyNumber(_v.target.value);
  };
  const onPolicyFind = (_v) => {
    console.log("policy click");
    try {
      // const findPolicy =
    } catch (err) {
      console.log(err);
    }
  };

  // Submission payload-------------
  const payload = {
    customerFirstname: fname || "",
    customerLastname: lastname || "",
    customerContactNo: phoneNumber,
    district: district,
    customerEmail: email || "",
    customerPolicyNumber: "",
    faCode: faq || "",
    newFaRequest: true,
    remarks: remark || "",
  };

  // Single Lead Submit---
  const handleOnlySubmit = async () => {
    try {
      if (fname && phoneNumber && district) {
        setLoading(true);
        const sendSingleLead = await submitLeadManual(payload);
        message.success(sendSingleLead.data.message);
        setCallBack(!callBack);
        setLoading(false);
        form.resetFields();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      error.response.data.details[0] &&
        message.error(error.response.data.details[0]);
    }
  };

  // Submit All and Exit Call
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const sendSingleLead = await submitLeadManual(payload);
      message.success(sendSingleLead.data.message);
      setCallBack(!callBack);
      setLoading(false);
      form.resetFields();
      setAddLead(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  // Table Data
  const onTableChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };

  // Api Calling ----------

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const districtDisplay = await getDistrict();
        setDistrictAPI(districtDisplay.data.data);

        const leadDisplay = await leadList();
        setLeadListView(leadDisplay.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Something went wrong");
      }
    })();

    return () => ac.abort();
  }, [callBack]);

  // Update Single Lead ModaL

    const [updateLeadModal, setUpdateLeadModal] = useState(false);
    const [singleID,setSingleID]=useState(0)

    console.log("LeadID",singleID)
    const showLeadUpdateMOdal = (id) => {
      setSingleID(id)
      setUpdateLeadModal(true);
    };
  
    const updateModalCancel = () => {
      form.resetFields();
      setUpdateLeadModal(false);
    };
  


  // Page Pagination
  // const [first, setFirst] = useState(0);
  // const [rows, setRows] = useState(10);
  const [currentPage,setCurrentPage]=useState(1)
  const pageSize = 10;
  const onPageChange = (event) => {
    setCurrentPage(event.page + 1)
  };


  // Data Table Colum

  const columns = [
    {
      title: "Date",
      dataIndex: "leadDate",
      sorter: (a, b) => new Date(a.leadDate) - new Date(b.leadDate),
      sortOrder: sortedInfo.columnKey === "leadDate" ? sortedInfo.order : null,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a?.firstName?.length - b?.firstName?.length,
      sortOrder: sortedInfo.columnKey === "firstName" ? sortedInfo.order : null,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a?.lastName?.length - b?.lastName?.length,
      sortOrder: sortedInfo.columnKey === "lastName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Mobile No",
      dataIndex: "contactNo",
      key: "contactNo",
      sorter: (a, b) => a?.contactNo - b?.contactNo,
      sortOrder: sortedInfo.columnKey === "contactNo" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a?.email?.length - b?.email?.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
    },
    {
      title: "District",
      dataIndex: "districtName",
      key: "districtName",
      sorter: (a, b) => a?.districtName?.length - b?.districtName?.length,
      sortOrder:
        sortedInfo.columnKey === "districtName" ? sortedInfo.order : null,
      ellipsis: true,

      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 1,
      // },
    },
    {
      title: "Sources",
      dataIndex: "leadSourceName",
      key: "leadSourceName",
      sorter: (a, b) => a?.leadSourceName?.length - b?.leadSourceName?.length,
      sortOrder:
        sortedInfo.columnKey === "leadSourceName" ? sortedInfo.order : null,
      ellipsis: true,
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 1,
      // },
    },
    {
      title: "Status",
      dataIndex: "leadStatus",
      key: "leadStatus",
      sorter: (a, b) => a?.leadStatus?.length - b?.leadStatus?.length,
      sortOrder:
        sortedInfo.columnKey === "leadStatus" ? sortedInfo.order : null,
      ellipsis: true,
      render: (leadStatus) => {
        return (leadStatus === "Verified" || leadStatus === "Sent To UAA") ? (
          <>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "#A4CE4E",
                border: "1px solid #FFFFFF",
                borderRadius: "14px",
                marginLeft: "15px",
              }}
            ></div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "#D42123",
                border: "1px solid #FFFFFF",
                borderRadius: "14px",
                marginLeft: "15px",
              }}
            ></div>{" "}
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (states,_data) =>{

        return (_data?.leadStatus === "Not Verified") ? 
        <><NavLink onClick={(e)=>showLeadUpdateMOdal(_data.leadId)}>Edit</NavLink></> : <NavLink disable onClick={(e)=>showLeadUpdateMOdal(_data.leadId)}>Edit</NavLink>;
          
        
      } 
        
    },
  ];

  return (
    <>
      <Layout pageName={"Leads"}>
        <div className="lead-container">
          <p className="bt_Text">Lead Submission</p>

          {/* Add and Search Section-------------------------- */}
          <div className="lead_S_Btn">
            <div className="lead-search">
              <input
                onChange={onSearchPhone}
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

            <div className="add-lead-group">
              <button className="btn_group me-4" onClick={showBUModal}>
                BULK UPLOAD
              </button>
              <button className="btn_group" onClick={showADModal}>
                + ADD LEAD
              </button>
            </div>
          </div>

          {/* Lead Submission Table View---------- */}
          <div className="__l_sub_table">
            <div>
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={leadListView}
                onChange={onTableChange}
                // pagination={false}
              />
            </div>
          </div>

          {/* Lead Generation Pagination */}
          <div className="pgn_ld_sb">
          
          </div>

          {/* Modal Section ------*/}

          {/* Bulk Upload----------- */}

          {isBulkModal && (
            <UploadModal
              open={isBulkModal}
              onCancel={() => setBulkUpModal(false)}
              setBulkUpModal={setBulkUpModal}
            />
          )}

          {/* Add Lead --------------*/}
          <div>
            <Modal
              className="addLeadModal"
              key="addlead"
              title="ADD LEADS"
              open={addLead}
              onCancel={handleCancel}
              footer={false}
            >
              <div className="_modal_body">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label=""
                    name="firstname"
                    validateFirst={true}
                    onChange={handleName}
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                    ]}
                  >
                    <Input placeholder="* First Name" />
                  </Form.Item>

                  <Form.Item
                    label=""
                    validateFirst={true}
                    name="lastname"
                    onChange={handleLastName}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>

                  <Form.Item
                    label=""
                    name="mobilenumber"
                    validateFirst={true}
                    onChange={handlePhoneNumber}
                    rules={[
                      {
                        required: true,
                        message: "Please input valid mobile number!",
                      },
                    ]}
                  >
                    <Input
                      maxLength={13}
                      placeholder={`* Mobile 
              8801777-777524`}
                    />
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="email"
                    validateFirst={true}
                    onChange={handleEmail}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    label=""
                    name="district"
                    validateFirst={true}
                    rules={[
                      {
                        required: true,
                        message: "Please Select District!",
                      },
                    ]}
                  >
                    <Select
                      placeholder=" * District"
                      onChange={onDistrictChange}
                      allowClear
                      showSearch
                    >
                      {districtAPI.map((_d) => {
                        return (
                          <>
                            <Option key={_d.id} value={_d.nameEnglish}>
                              {_d.labelEnglish}
                            </Option>
                          </>
                        );
                      })}
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item label="" validateFirst={true} name="policy">
                    <div className="exiting_policy">
                      <Input
                        onChange={onPolicySearch}
                        className="policy_input"
                        placeholder="Existing Policy Number (If Any)"
                      />
                      <Button onClick={onPolicyFind} className="policy_btn ">
                        FIND
                      </Button>
                    </div>
                    {findPolicy ? (
                      <div className="_ex_P">
                        <span style={{ color: "#6E6E6E" }}>
                          Lead Submit with new FA ?
                        </span>
                        <Radio.Group onChange={onFAQChange} value={value}>
                          <Radio value="yes">YES</Radio>
                          <Radio value="no">NO</Radio>
                        </Radio.Group>
                      </div>
                    ) : null}
                  </Form.Item>

                  <Form.Item label="" name="facode">
                    <Input placeholder="FA Code" onChange={handleFAQ} />
                  </Form.Item>

                  <Form.Item label="" name="remark">
                    <TextArea
                      onChange={handleRemrk}
                      className="custom_remark"
                      showCount
                      maxLength={1000}
                      style={{ resize: "none" }}
                      placeholder="Remark"
                    />
                  </Form.Item>

                  <div className="sub_btn_group">
                    <Form.Item>
                      <Button
                        onClick={handleOnlySubmit}
                        className="sub_btn me-4"
                      >
                        SUBMIT
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <button htmlType="submit" className="sub_btn">
                        SUBMIT & CLOSE
                      </button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </Modal>
          </div>

          {/* Single Lead Update --------------*/}
        </div>
      </Layout>

      {
        updateLeadModal && <LeadUpdateModal
        singleID={singleID}
        open={updateLeadModal}
        onCancel={() => updateModalCancel(false)}
        setUpdateLeadModal={setUpdateLeadModal}
        />
      }
    </>
  );
  
};

export default LeadsPage;

// <Paginator
//               first
//               rows={10}
//               totalRecords={leadListView?.length}
//               currentPage={currentPage - 1}
//               onPageChange={onPageChange}
//               />