import { useState, useEffect } from "react";
import {
  Radio,
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Tag,
  Spin,
} from "antd";

import {
  getDistrict,
  submitLeadManual,
  findFinicalAgent,
} from "./Service/lead_service";
import "./LeadPage.css";
import Loader from "../../components/Loader/Loader.tsx";

const AddLeadModal = ({
  open,
  onCancel,
  setAddLead,
  callBack,
  setCallBack,
  setLoading,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const handleCancel = () => {
    form.resetFields();
    setFaStatus(null);
    setAddLead(false);
  };

  const [districtAPI, setDistrictAPI] = useState([]);

  // Form Field onChange Setup-----
  const [fname, setFName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [findPolicy, setPolicyNumber] = useState("");
  const [faStatus, setFaStatus] = useState(null);
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
    setFaYesNo(e?.target?.value);
  };

  // Find FinicalAgent By Policy Number
  const onPolicyFind = async (_v) => {
    try {
      if (findPolicy) {
        setLoading(true);
        const faRes = await findFinicalAgent(findPolicy);
        setFaCode(faRes?.data?.data?.agentCode);
        setFaStatus(faRes?.data?.data?.active);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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
        setFaStatus(null);
      } catch (error) {
        setLoading(false);
        error?.response?.data?.details[0] &&
          message.error(error?.response?.data?.details[0]);
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

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return (
    <>
      <Modal
        className="addLeadModal"
        key="addlead"
        title="ADD LEADS"
        open={open}
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
              <Input type="email" placeholder="Email" className="input_group" />
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
              <Spin spinning={isLoading}>
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
              </Spin>
            </Form.Item>
            {faStatus === false ? (
              <div style={{ marginTop: "10px", marginBottom: "15px" }}>
                <p style={{ color: "#6E6E6E" }}>
                  FA Status :{" "}
                  <Tag color="#f50">FA Inactive. New FA will be attached</Tag>
                </p>
              </div>
            ) : null}
            {faStatus === null ? (
              <Form.Item label="" name="facode">
                <Input placeholder="FA Code" className="input_group" readOnly />
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
    </>
  );
};

export default AddLeadModal;
