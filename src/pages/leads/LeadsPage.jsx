import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import moment from "moment";
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
  Tag
} from "antd";
import UploadModal from "./CustomModal/UploadModal";
import LeadUpdateModal from "./LeadUpdateModal";
import {
  getDistrict,
  submitLeadManual,
  leadList,
  findFinicalAgent,
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
    setFaStatus(null)
    setAddLead(false);
  };

  // setup Field Data from API
  const [districtAPI, setDistrictAPI] = useState([]);
  const [singleLeadSubmit, setSingleLeadSubmit] = useState([]);
  const [leadListView, setLeadListView] = useState([]);
  const [p_Number, set_P_Number] = useState(0);
  const [p_Size, set_P_Size] = useState(10);
  const [totalPages, setTotal] = useState(0);

  // setIndexNumber
  const frontPaginationNumber = p_Number + 1;

  const onPaginationChange = (pageNumber, pageSize) => {
    const pageNum = pageNumber - 1;
    set_P_Number(pageNum);
    set_P_Size(pageSize);
  };
  // Table Sorting
  const [sortedInfo, setSortedInfo] = useState({});
  // Table Data
  const onTableChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };

  const setcontactNoSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "leadDate",
    });
  };

  // Form Field onChange Setup-----
  const [fname, setFName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [findPolicy, setPolicyNumber] = useState("");
  const [faStatus,setFaStatus]=useState(null);
  const [faYesNO, setFaYesNo] = useState("yes");
  const newFaReq = faYesNO === "yes" ? true : false;
  const [faCode, setFaCode] = useState("");
  const [remark, setRemak] = useState("");
 
 
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
  
  const handleRemrk = (e) => {
    setRemak(e.target.value);
  };
  // District ----
  const onDistrictChange = (values) => {
    setDistrict(values);
  };

  // Radio FAQ
  const onFAQChange = (e) => {
     setFaYesNo (e?.target?.value)
  };

  // Find FinicalAgent By Policy Number
  const onPolicyFind = async(_v) => {

    try {
      const faRes = await findFinicalAgent(findPolicy);
      setFaCode(faRes?.data?.data?.agentCode);
      setFaStatus(faRes?.data?.data?.active)
      
    } catch (err) {
      // console.log(err);
    }
  };

  // Submission payload-------------
  const leadSubPayload = {
    customerFirstname: fname || "",
    customerLastname: lastname || "",
    // customerContactNo: phoneNumber,
    customerContactNo: `880${phoneNumber}`,
    district: district,
    customerEmail: email || "",
    customerPolicyNumber: findPolicy || "",
    faCode: faCode || "",
    newFaRequest: newFaReq,
    remarks: remark || "",
  };

  // Submit All and Exit Call
  const onFinish = async (btnTypes, values) => {
    if (fname && phoneNumber && district) {
      try {
        setLoading(true);
        const sendSingleLead = await submitLeadManual(leadSubPayload);
        message.success(sendSingleLead.data.message);
        setCallBack(!callBack);
        setLoading(false);
        setAddLead(false);
        form.resetFields();
        if (btnTypes === "singleExit") {
        }
        setFaStatus(null)
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // Api Calling ----------

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const districtDisplay = await getDistrict();
        setDistrictAPI(districtDisplay.data.data);

        const leadDisplay = await leadList(p_Number, p_Size);

        setTotal(leadDisplay?.data?.data?.totalItems);
        setLeadListView(leadDisplay?.data?.data?.items);
        set_P_Number(...p_Number, leadDisplay?.data?.data?.pageNumber);
        set_P_Size(...p_Size, leadDisplay?.data?.data?.pageSize);
        




        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [callBack, p_Number, p_Size]);

  // Update Single Lead ModaL

  const [updateLeadModal, setUpdateLeadModal] = useState(false);
  const [singleID, setSingleID] = useState(0);

  const showLeadUpdateMOdal = (id) => {
    setSingleID(id);
    setUpdateLeadModal(true);
  };

  const updateModalCancel = () => {
    form.resetFields();
    setUpdateLeadModal(false);
  };

  // Data Table Colum

  const columns = [
    {
      title: "Date",
      dataIndex: "leadDate",
      key: "leadDate",
      sorter: (a, b) => new Date(a.leadDate) - new Date(b.leadDate),
      sortOrder: sortedInfo.columnKey === "leadDate" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a?.firstName.localeCompare(b?.firstName),
      sortOrder: sortedInfo.columnKey === "firstName" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a?.lastName?.length - b?.lastName?.length,
      sortOrder: sortedInfo.columnKey === "lastName" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Mobile No",
      dataIndex: "contactNo",
      key: "contactNo",
      sorter: (a, b) => a?.contactNo - b?.contactNo,
      sortOrder: sortedInfo.columnKey === "contactNo" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a?.email?.length - b?.email?.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "District",
      dataIndex: "districtName",
      key: "districtName",
      sorter: (a, b) => a?.districtName?.length - b?.districtName?.length,
      sortOrder:
        sortedInfo.columnKey === "districtName" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],

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
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
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
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (leadStatus) => {
        return leadStatus === "Verified" || leadStatus === "Sent To UAA" ? (
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
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (states, _data) => {
        return _data?.leadStatus === "Not Verified" ? (
          <>
            <NavLink onClick={(e) => showLeadUpdateMOdal(_data.leadId)}>
              Edit
            </NavLink>
          </>
        ) : (
          <NavLink disabled>Edit</NavLink>
        );
      },
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
                key={leadListView.totalItems}
                loading={isLoading}
                columns={columns}
                dataSource={leadListView}
                pagination={false}
                onChange={onTableChange}
                tableLayout="fixed"
              />
            </div>
          </div>

          {/* Lead Generation Pagination */}
          <div className="pgn_ld_sb">
            <Pagination
              showQuickJumper
              current={frontPaginationNumber}
              // total={Math.ceil(total)}
              total={totalPages}
              onChange={onPaginationChange}
            />
          </div>

          {/* Modal Section ------*/}

          {/* Bulk Upload----------- */}

          {isBulkModal && (
            <UploadModal
              open={isBulkModal}
              onCancel={() => setBulkUpModal(false)}
              setBulkUpModal={setBulkUpModal}
              callBack={callBack}
              setCallBack={setCallBack}
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
                  autoComplete="off"
                >
                  <Form.Item
                    label=""
                    name="firstname"
                    validateFirst={true}
                    onChange={handleName}
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                    ]}
                  >
                    <Input placeholder="* First Name" className="input_group" />
                  </Form.Item>

                  <Form.Item
                    label=""
                    validateFirst={true}
                    name="lastname"
                    onChange={handleLastName}
                  >
                    <Input placeholder="Last Name" className="input_group" />
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
                      // className='contactNumber'
                      addonBefore="880"
                      maxLength={10}
                      placeholder={`* 1777-777524`}
                    />
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="email"
                    validateFirst={true}
                    onChange={handleEmail}
                  >
                    <Input
                      type="email"
                      placeholder="Email"
                      className="input_group"
                    />
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
                        className="input_group"
                        onChange={(e) => setPolicyNumber(e?.target?.value)}
                        className="policy_input"
                        placeholder="Existing Policy Number (If Any)"
                      />
                      <Button onClick={onPolicyFind} className="policy_btn ">
                        FIND
                      </Button>
                    </div>
                    {faStatus === true ? (
                      <div className="_ex_P">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "5px",
                          }}
                        >
                          <span style={{ color: "#6E6E6E", marginLeft: "3px" }}>
                            Lead Submit with new FA ?
                          </span>
                          <p style={{ color: "#6E6E6E" }}>
                            FA Status : <Tag color="#87d068">Active</Tag>
                          </p>
                        </div>
                        <Radio.Group onChange={onFAQChange} value={faYesNO}>
                          <Radio value="yes">YES</Radio>
                          <Radio value="no">NO</Radio>
                        </Radio.Group>

                        <Input
                          value={faCode}
                          placeholder="FA Code"
                          className="input_group"
                          readOnly
                        />
                      </div>
                    ) : null}
                  </Form.Item>
                  {faStatus === false ? (
                    <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                      <p style={{ color: "#6E6E6E" }}>
                        FA Status :{" "}
                        <Tag color="#f50">
                          FA Inactive. New FA will be attached
                        </Tag>
                      </p>
                    </div>
                  ) : null}
                  {faStatus === null ? (
                    <Form.Item label="" name="facode">
                      <Input
                        placeholder="FA Code"
                        className="input_group"
                        readOnly
                      />
                    </Form.Item>
                  ) : null}

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
                      <button
                        htmlType="submit"
                        onClick={() => onFinish("singleCon")}
                        className="sub_btn me-4"
                      >
                        SUBMIT
                      </button>
                    </Form.Item>
                    <Form.Item>
                      <button
                        htmlType="submit"
                        onClick={() => onFinish("singleExit")}
                        className="sub_btn"
                      >
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

      {updateLeadModal && (
        <LeadUpdateModal
          key={singleID}
          singleID={singleID}
          open={updateLeadModal}
          onCancel={() => updateModalCancel(false)}
          setUpdateLeadModal={setUpdateLeadModal}
          callBack={callBack}
          setCallBack={setCallBack}
        />
      )}
    </>
  );
};

export default LeadsPage;
