import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./Leadpage.css";
import * as Yup from "yup";
import { Paginator } from "primereact/paginator";
import { Table, Radio, Modal, Form, Input, Select,Button, message,Pagination} from "antd";
import AddBulkUpload from "./AddBulkUpload";
import { getDistrict, submitLeadManual, leadList} from './Service/lead_service';
const { Option } = Select;
const { TextArea } = Input;

const LeadsPage = () => {
  const [form] = Form.useForm();
  const [isLoading,setLoading]=useState(false);
  const [callBack,setCallBack]=useState(false);

  const [findPolicy, setPolicyNumber] = useState("");

  // Modal Section ----------

  // Bulk component
  const [bulkUpload, setBulkUpload] = useState(false);

  const showBUModal = () => {
    setBulkUpload(false);
  };

  const handleX = () => {
    setBulkUpload(false);
  };

  // add lead comp
  const [addLead, setAddLead] = useState(false);
  const showADModal = () => {
    setAddLead(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setAddLead(false);
  };

  // Page Pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  /*   const useStyles = withStyles((theme) => ({
    root: {
      "& .MuiFilledInput-root": {
        background: "rgb(232, 241, 250)"
      }
    }
  })); */

  // const [leads, setLeads] = useState([
  //   {
  //     leadId: 235,

  //     firstname: "Tomal",

  //     lastname: "Mahdi",

  //     email: "tomal.mahdi@metlife.com.bd",

  //     contactNo: "01677503555",

  //     leadSourceName: "360Health",

  //     districtName: "Dhaka",

  //     leadStatus: "Not Verified",

  //     leadDate: "2023-06-19",
  //   },

  //   {
  //     leadId: 241,

  //     firstname: "Tomal",

  //     lastname: "Mahdi",

  //     email: "tomal.mahdi@metlife.com.bd",

  //     contactNo: "01677503555",

  //     leadSourceName: "360Health",

  //     districtName: "Dhaka",

  //     leadStatus: "Not Verified",

  //     leadDate: "2023-06-19",
  //   },
  // ]);

  //

  //
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // Form
  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string()
      //.min(5, "Password must be 5 characters at minimum")
      .required("Last name is required"),
    mobileno: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(11, "Mobile number must be 11 characters")
      .max(11, "Mobile number must be 11 characters")
      .required("Mobile number is required"),
    district: Yup.number().positive().required("Please select district"),
  });

  // Modal On Submit -------


  // Find On Set Data----
  const onPolicySearch = (_v) => {
    console.log("find value", _v.target.value);
    setPolicyNumber(_v.target.value);
  };
  const onPolicyFind = (_v) => {
    console.log("policy click")
    try {
      // const findPolicy =
    } catch (err) {
      console.log(err);
    }
  };
  
  // setup Field Data from API
  const [districtAPI,setDistrictAPI]=useState([]);
  const [singleLeadSubmit,setSingleLeadSubmit]=useState([]);
  const [leadListView,setLeadListView]=useState([])

  console.log("leadListView",leadListView)
  
  // Table Sorting 
  const [sortedInfo, setSortedInfo] = useState({});
  const setcontactNoSort = () => {
    setSortedInfo(
      {
      order: 'descend',
      columnKey: 'contactNo',
    },
    
    );
  };

  // Form Field onChange Setup-----
  const [fname,setFName]=useState("")
  const [lastname,setLastName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [email,setEmail]=useState('')
  const [faq,setFAQ]=useState('')
  const [remark,setRemak]=useState('')
  const [district,setDistrict]=useState('')

  const handleName = (e) => {
    
    setFName(e.target.value)
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    console.log("handleName", e.target.value);
    setPhoneNumber(e.target.value)
  };
  const handleFAQ = (e) => {
    setFAQ(e.target.value)
  };
  const handleRemrk = (e) => {
    setRemak(e.target.value)
  };
  // District ----
  const onDistrictChange = (values) => {
    setDistrict(values)
  };

  // Radio FAQ
  const [value, setValue] = useState("yes");
  const onFAQChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // Submission-------------
  const payload ={
   "customerFirstname": fname || '',
   "customerLastname": lastname || "",
   "customerContactNo": phoneNumber,
   "district": district,
   "customerEmail": email || "",
   "customerPolicyNumber":  "",
   "faCode": faq || "",
   "newFaRequest": true,
   "remarks": remark || "",
 }
  const handleOnlySubmit = () => {
    console.log("clicked");

    try {
      (async () => {
       
        setLoading(true);
        const sendSingleLead = await submitLeadManual(payload);
        message.success(sendSingleLead.data.message)
        setCallBack(!callBack)
        setLoading(false);
        form.resetFields();
        
      })();
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      // err.respose.data.message && message.error(err.respose.data.message)
    }
    
  };

  const onFinish = (values) => {
    try {
      (async () => {
       
        setLoading(true);
        const sendSingleLead = await submitLeadManual(payload);
        message.success(sendSingleLead.data.message)
        setCallBack(!callBack)
        setLoading(false);
        form.resetFields();
        setAddLead(false);
        
      })();
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      // err.respose.data.message && message.error(err.respose.data.message)
    }
    // setAddLead(false);
  };

  // Search by Phonee
  const [filterDate, setFilterData] = useState([]);
  const onSearchPhone = (e) => {
    const _s_v = e.target.value;
    setFilterData(_s_v);

    console.log("search phone", e.target.value);
  };
  const onSearchClick = (e) => {
    // const filterTable = data.filter(data.mn === filterDate);
    // console.log("filter phone", filterTable);
  };

  // Table Data
  const onTableChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
    setSortedInfo(sorter)
  };


  // Api Calling ----------

  useEffect(() => {

    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true)
        const districtDisplay = await getDistrict();
        setDistrictAPI(districtDisplay.data.data);

        const leadDisplay = await leadList();
        console.log("leadData",leadDisplay.data.data)
        setLeadListView(leadDisplay.data.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error('Something went wrong')
      }
    })()


    return () => ac.abort();

  }, [callBack])


  // Data Table Colum 
  // Demo Data ---------

const columns = [
  {
    title: "Date",
    dataIndex: "leadDate",
    // sorter: {
    //   compare: (a, b) => a.chinese - b.chinese,
    //   multiple: 3,
    // },
  },
  {
    title: "First Name",
    dataIndex: "firstname",
    key: 'firstname',
    sorter: (a, b) => a.firstname === b.firstname,
    sortOrder: sortedInfo.columnKey === 'firstname' ? sortedInfo.order : null,
    ellipsis: true,
    
  },
  {
    title: "Last Name",
    dataIndex: "lastname",
    key: 'lastname',
    sorter: (a, b) => a.lastname === b.lastname,
    sortOrder: sortedInfo.columnKey === 'lastname' ? sortedInfo.order : null,
    ellipsis: true,
    
  },
  {
    title: "Mobile No",
    dataIndex: "contactNo",
    key: 'contactNo',
    sorter: (a, b) => a.contactNo - b.contactNo,
    sortOrder: sortedInfo.columnKey === 'contactNo' ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: 'email',
    sorter: {
      compare: (a, b) => a.email = b.email, 
    },
  },
  {
    title: "District",
    dataIndex: "districtName",
    key: 'districtName',
    sorter: (a, b) => a.districtName === b.districtName,
    sortOrder: sortedInfo.columnKey === 'districtName' ? sortedInfo.order : null,
    ellipsis: true,
    
    // sorter: {
    //   compare: (a, b) => a.english - b.english,
    //   multiple: 1,
    // },
  },
  {
    title: "Sources",
    dataIndex: "leadSourceName",
    key: 'leadSourceName',
    sorter: (a, b) => a.leadSourceName === b.leadSourceName,
    sortOrder: sortedInfo.columnKey === 'leadSourceName' ? sortedInfo.order : null,
    ellipsis: true,
    // sorter: {
    //   compare: (a, b) => a.english - b.english,
    //   multiple: 1,
    // },
  },
  {
    title: "Status",
    dataIndex: "leadStatus",
    key: 'leadStatus',
    sorter: (a, b) => a.leadStatus === b.leadStatus,
    sortOrder: sortedInfo.columnKey === 'leadStatus' ? sortedInfo.order : null,
    ellipsis: true,
    render: (leadStatus) => {
      console.log("leadS",leadStatus)
      return( 
        leadStatus === 'Verified' || leadStatus === "Sent To UAA" ? <>
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
      
      </> : <>
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#D42123",
          border: "1px solid #FFFFFF",
          borderRadius: "14px",
          marginLeft: "15px",
        }}
      ></div> </>
      ) 
      
    }
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (states) => <NavLink>Edit</NavLink>,
  },
];

  return (
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

        <Modal
          key="bulkupload"
          title="BULK UPLOAD"
          open={bulkUpload}
          onCancel={handleX}
          footer={false}
        ></Modal>

        {/* {bulkUpload && (
          <AddBulkUpload
            bulkUpload={bulkUpload}
            handleX={handleX}
            setBulkUpload={setBulkUpload}
          />
        )} */}

        {/* Add Lead --------------*/}
        <div className="addLeadModal">
          <Modal
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

                <Form.Item label="" validateFirst={true} name="lastname"  onChange={handleLastName}>
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
                    maxLength={11}
                    placeholder={`* Mobile 
              01777-777524`}
                  />
                </Form.Item>
                <Form.Item label="" name="email" validateFirst={true}  onChange={handleEmail}>
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

                  {
                    districtAPI.map((_d)=>{
                      console.log("data",_d)
                      return (
                        <>
                        <Option key={_d.id} value={_d.nameEnglish}>{_d.labelEnglish}</Option>
                        </>
                      )
                    })
                  }
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
                  <Input placeholder="FA Code"  onChange={handleFAQ} />
                </Form.Item>

                <Form.Item label="" name="remark">
                  {/* <Input className='custom_remark' placeholder="Remark" /> */}
                  {/* <input className="custom_remark" placeholder="Remark" /> */}
                  <TextArea
                    onChange={handleRemrk}
                    className="custom_remark"
                    showCount
                    maxLength={1000}
                    style={{ resize: "none" }}
                    placeholder="disable resize"
                  />
                </Form.Item>

                <div className="sub_btn_group">
                  <Form.Item>
                    <Button onClick={handleOnlySubmit} className="sub_btn me-4">
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
      </div>
    </Layout>
  );
};

export default LeadsPage;



// // <Paginator
//             first={first}
//             rows={rows}
//             totalRecords={120}
//             onPageChange={onPageChange}
//           />


// <Pagination
//         total={leadListView.length}
//         showSizeChanger
//         showQuickJumper
//         showTotal={(total) => `Total ${total} items`}
//       />