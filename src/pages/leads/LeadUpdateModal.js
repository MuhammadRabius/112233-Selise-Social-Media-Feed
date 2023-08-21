import React, { useState, useEffect } from "react";
import {
  Table,
  Radio,
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Tooltip,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  getDistrict,
  leadListByID,
  leadUpdateByID,
} from "./Service/lead_service";

const LeadUpdateModal = ({
  open,
  onCancel,
  singleID,
  setUpdateLeadModal,
  callBack,
  setCallBack,
}) => {
  const [form] = Form.useForm();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const handleCancel = () => {
    onCancel();
  };

  const { Option } = Select;
  const { TextArea } = Input;
  const [phoneError,setPhoneError] =useState('')
  const [districtAPI, setDistrictAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listViewData, setListbyIdData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    districtName: "",
    customerPolicyNumber: "",
    faCode: "",
    leadSourceName: "",
    leadStatus: "",
    newFaRequest: "",
    remarks: "",
  });

  // payloadContactMagic
  
  const phonePrefixZero = listViewData?.contactNo?.charAt(0) === "0" || null ? `880${listViewData?.contactNo?.substring(1)}` : `880${listViewData?.contactNo}`
  const contactNumber = listViewData?.contactNo?.charAt(0) === "8" || null ? `${listViewData?.contactNo}` : phonePrefixZero;
  
  const [district, setDistrict] = useState({
    districtName: "",
  });

  // District ----
  const onDistrictChange = (value) => {
    console.log("values", value);
    setListbyIdData({ ...listViewData, districtName: value });
  };

  // Submission payload-------------
  const payload = {
    customerFirstname: listViewData?.firstName,
    customerLastname: listViewData?.lastName,
    // customerContactNo: listViewData?.contactNo,
    customerContactNo: contactNumber,
    district: listViewData?.districtName,
    customerEmail: listViewData?.email,
    customerPolicyNumber: listViewData?.customerPolicyNumber,
    faCode: listViewData?.faCode,
    newFaRequest: listViewData?.newFaRequest,
    remarks: listViewData?.remarks,
  };

   console.log("number",contactNumber)
   
  // Update All and Exit Call
  const onFinish = async () => {

    if (
      listViewData?.firstName &&
      listViewData?.contactNo?.length === 13 &&
      listViewData?.districtName
    ) {
        try {
          setLoading(true);

        const res = await leadUpdateByID(singleID, payload);
        if (res?.data?.status === false) {
          message.error(res.data.message);
        }

        setCallBack(!callBack);
        setLoading(false);
        setUpdateLeadModal(false);
      } catch (error) {
        setLoading(false);
        error.response.data.details[0] &&
          message.error(error.response.data.details[0]);
      }
    } else {
      // message.warning('Mobile number must be 10 digits, exclude 880')
      setPhoneError('Mobile number must be 10 digits, exclude 880. i.e 1405628226')
    }
  };
  
  // Data Fetching by ID
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const districtDisplay = await getDistrict();
        setDistrictAPI(districtDisplay.data.data);

        if (singleID) {
          const leadDisplay = await leadListByID(singleID);
          setListbyIdData({
            ...listViewData,
            firstName: leadDisplay?.data?.data?.firstName,
            lastName: leadDisplay?.data?.data?.lastName,
            contactNo: leadDisplay?.data?.data?.contactNo,
            email: leadDisplay?.data?.data?.email,
            districtName: leadDisplay?.data?.data?.districtName,
            customerPolicyNumber: leadDisplay?.data?.data?.customerPolicyNumber,
            faCode: leadDisplay?.data?.data?.faCode,
            leadSourceName: leadDisplay?.data?.data?.leadSourceName,
            leadStatus: leadDisplay?.data?.data?.leadStatus,
            newFaRequest: leadDisplay?.data?.data?.newFaRequest,
            remarks: leadDisplay?.data?.data?.remarks,
          });
          setDistrict({
            ...listViewData,
            districtName: leadDisplay?.data?.data?.districtName,
          });
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [callBack, singleID]);


  const validatePhoneNumberLength = (_,value)=>{
    if(value && (value.length !==13 )){
      return Promise.reject("Phone Number Must Have 13 Number")
    }
    return Promise.resolve();
  };
  return (
    <>
      <Modal
        className="addLeadModal"
        key="updatelead"
        title="Update Lead"
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Spin indicator={antIcon} spinning={loading}>
          <div className="_modal_body">
            <Form form={form} onFinish={onFinish} autoComplete="off" >
              <Form.Item name="firstName" validateFirst={true}>
                {" "}
                <Input
                  className="input_group"
                  type="text"
                  placeholder="* First Name"
                  value={listViewData?.firstName}
                  onChange={(e) =>
                    setListbyIdData({
                      ...listViewData,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item name="lastName">
                {" "}
                <Input
                  className="input_group"
                  placeholder="Last Name"
                  value={listViewData?.lastName}
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="contactNo"
                
              >
                {" "}
                {listViewData?.contactNo?.charAt(0) === "8" ? (
                  <Input
                    
                    addonBefore="880"
                    // className="input_group"
                    maxLength={10}
                    placeholder="* Mobile Number"
                    value={listViewData?.contactNo.replace(/^880/g, "")}
                    onChange={(e) =>
                      setListbyIdData({
                        ...listViewData,
                        contactNo: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Input
                    
                    addonBefore="880"
                    // className="input_group"
                    maxLength={10}
                    placeholder="* Mobile Number"
                    value={listViewData?.contactNo?.replace(/^0/g, "")}
                    onChange={(e) =>
                      setListbyIdData({
                        ...listViewData,
                        contactNo: e.target.value,
                      })
                    }
                  />
                )}
                {
                  phoneError && <p style={{color:'red'}}>{phoneError}</p>
                }
              </Form.Item>
              
              <Form.Item name="email">
                {" "}
                <Input
                  className="input_group"
                  type="text"
                  placeholder="Email"
                  value={listViewData?.email}
                  disabled
                />
              </Form.Item>

              <Form.Item
                label=""
                name="districtName"
                validateFirst={true}

                // rules={[
                //   {
                //     required: true,
                //     message: "Please Select District!",
                //   },
                // ]}
              >
                <select
                  className="districtChange"
                  placeholder={`${listViewData?.districtName}`}
                  onChange={(e) => onDistrictChange(e.target.value)}
                  allowClear
                  showSearch
                  value={listViewData?.districtName}
                >
                  {districtAPI.map((_d) => {
                    return (
                      <>
                        <option key={_d.id} value={_d.nameEnglish}>
                          {_d.labelEnglish}
                        </option>
                      </>
                    );
                  })}
                  }
                </select>
              </Form.Item>

              <Form.Item
                label=""
                validateFirst={true}
                name="customerPolicyNumber"
              >
                <div className="exiting_policy">
                  <Input
                    className="input_group"
                    disabled
                    className="policy_input"
                    placeholder="Existing Policy Number (If Any)"
                  />
                  <Button className="policy_btn " disabled>
                    FIND
                  </Button>
                </div>
              </Form.Item>

              <Form.Item label="" name="facode">
                <Input
                  className="input_group"
                  placeholder="FA Code"
                  disabled
                  value={listViewData?.faCode}
                />
              </Form.Item>

              <Form.Item label="" name="remark">
                <TextArea
                  value={listViewData?.remark}
                  disabled
                  className="custom_remark"
                  style={{ resize: "none" }}
                />
              </Form.Item>

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

export default LeadUpdateModal;
