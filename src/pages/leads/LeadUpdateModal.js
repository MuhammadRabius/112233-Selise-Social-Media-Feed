import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  getDistrict,
  leadListByID,
  leadUpdateByID,
} from "./Service/lead_service";
import { phonePrefix } from "../../global_state/action";
import Loader from "../../components/Loader/Loader";

const LeadUpdateModal = ({
  open,
  onCancel,
  singleID,
  setUpdateLeadModal,
  callBack,
  setCallBack,
  isLoading
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
    form.resetFields();
  };

  const { Option } = Select;
  const { TextArea } = Input;
  const [phoneError, setPhoneError] = useState("");
  const [district, setDistrict] = useState("")
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

  console.log("district",listViewData.districtName)



  // payloadContactMagic

  const phonePrefixZero =
    listViewData?.contactNo?.charAt(0) === "0" || null
      ? `880${listViewData?.contactNo?.substring(1)}`
      : `880${listViewData?.contactNo}`;
  const contactNumber =
    listViewData?.contactNo?.charAt(0) === "8" || null
      ? `${listViewData?.contactNo}`
      : phonePrefixZero;


  // District ----
 
  const onDistrictChange = (value) => {
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

  // Update All and Exit Call
  const onFinish = async () => {
    if (
      listViewData?.firstName &&
      contactNumber?.length === 13 &&
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
      listViewData?.districtName === null ?
       message.error(
        "Please insert District"
      ) :
      message.error(
        "Please input valid mobile number. Must be 10 digit exclude 880"
      );
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
            districtName : leadDisplay?.data?.data?.districtName,
            customerPolicyNumber: leadDisplay?.data?.data?.customerPolicyNumber,
            faCode: leadDisplay?.data?.data?.faCode,
            leadSourceName: leadDisplay?.data?.data?.leadSourceName,
            leadStatus: leadDisplay?.data?.data?.leadStatus,
            newFaRequest: leadDisplay?.data?.data?.newFaRequest,
            remarks: leadDisplay?.data?.data?.remarks,
          });
          setDistrict(leadDisplay?.data?.data?.districtName)
        };
        setLoading(false);
        
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [callBack, singleID]);

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
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) :
          <div className="_modal_body">
            <Form form={form} onFinish={onFinish} autoComplete="off">
              <Form.Item name="firstName" validateFirst={true} 
              rules={[
                {
                  pattern: "^[a-zA-Z\s]{3,350}$",
                  message:
                    "Name must be 3 to 350 characters long and should not contain special characters.",
                },
              ]}
              >
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

              {(listViewData?.contactNo?.length === 11 ||
                listViewData?.contactNo?.length === 13) &&
              (listViewData?.contactNo?.charAt(0) === "0" ||
                listViewData?.contactNo?.charAt(0) === "8") ? (
                <Form.Item name="contactNo">
                  {" "}
                  <Input
                    addonBefore="880"
                    // className="input_group"
                    maxLength={10}
                    placeholder="* Mobile Number"
                    value={phonePrefix(listViewData?.contactNo)}
                    onChange={(e) =>
                      setListbyIdData({
                        ...listViewData,
                        contactNo: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              ) : (
                <Form.Item name="contactNo">
                  {" "}
                  <Input
                    addonBefore="880"
                    // className="input_group"
                    maxLength={10}
                    placeholder="* Mobile Number"
                    value={phonePrefix(listViewData?.contactNo)}
                    onChange={(e) =>
                      setListbyIdData({
                        ...listViewData,
                        contactNo: e.target.value,
                      })
                    }
                  />
                  {
                    <small style={{ color: "red" }}>
                      Mobile number must be 10 digits, exclude 880. i.e
                      14XXXXXXXX
                    </small>
                  }
                </Form.Item>
              )}
              

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

              {listViewData?.districtName === null ? (
                <small style={{ color: "red" }}>Please Select District</small>
              ) : null}

              <Select
              className="districtChange"
                allowClear
                showSearch
                value={listViewData?.districtName}
                onChange={onDistrictChange}
                options={districtAPI.map((_d) => ({
                  label: _d.labelEnglish,
                  value: _d.nameEnglish,
                }))}
              />

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
              }
      </Modal>
    </>
  );
};

export default LeadUpdateModal;
