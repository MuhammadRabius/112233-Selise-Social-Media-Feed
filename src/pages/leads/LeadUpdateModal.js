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
  Pagination,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  getDistrict,
  leadListByID,
  leadUpdateByID,
} from "./Service/lead_service";

const LeadUpdateModal = ({ open, onCancel, singleID, setUpdateLeadModal }) => {
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
  const [callBack, setCallBack] = useState(false);
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

  const [district, setDistrict] = useState({
    districtName: "",
  });

  

  // District ----
  const onDistrictChange = (values) => {
    setListbyIdData({ ...listViewData, districtName: values });
  };

  // Submission payload-------------
  const payload = {
    customerFirstname: listViewData?.firstName,
    customerLastname: listViewData?.lastName,
    customerContactNo: listViewData?.contactNo,
    district: listViewData?.districtName,
    customerEmail: listViewData?.email,
    customerPolicyNumber: listViewData?.customerPolicyNumber,
    faCode: listViewData?.faCode,
    newFaRequest: listViewData?.newFaRequest,
    remarks: listViewData?.remarks,
  };

  // Update All and Exit Call
  const onFinish = async () => {
   
    try {
      setLoading(true);
      const res = await leadUpdateByID(singleID, payload);
      message.success(res.data.message);
      setCallBack(!callBack);
      setLoading(false);
      setUpdateLeadModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
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
        console.error("Something went wrong");
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
        <Spin indicator={antIcon} spinning={loading}>
          <div className="_modal_body">
            <Form form={form} onFinish={onFinish} autoComplete="off">
              <Form.Item name="firstName" validateFirst={true}>
                {" "}
                <Input
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
                  placeholder="Last Name"
                  value={listViewData?.lastName}
                  disabled
                />
              </Form.Item>
              <Form.Item name="contactNo" validateFirst={true}>
                {" "}
                <Input
                  maxLength={13}
                  placeholder="* Mobile Number"
                  value={listViewData?.contactNo}
                  onChange={(e) =>
                    setListbyIdData({
                      ...listViewData,
                      contactNo: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item name="email">
                {" "}
                <Input
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
                rules={[
                  {
                    required: true,
                    message: "Please Select District!",
                  },
                ]}
              >
                <Select
                  placeholder={`${listViewData?.districtName}`}
                  onChange={onDistrictChange}
                  allowClear
                  showSearch
                  initialValue={listViewData?.districtName}
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

              <Form.Item
                label=""
                validateFirst={true}
                name="customerPolicyNumber"
              >
                <div className="exiting_policy">
                  <Input
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
