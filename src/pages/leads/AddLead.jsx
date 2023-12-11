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

import "./LeadPage.css";
import {
  findFinicalAgent,
  getDistrict,
  submitLeadManual,
} from "../../services/Services";
import LogoutModal from "../../components/SessionOutModal/LogoutModal";

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
  const nameRegex = /^[A-Za-z.\s]{3,350}$/;
  const { Option } = Select;
  const { TextArea } = Input;
  const [logoutModal, setLogoutModal] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    setFaCode(0);
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
  const [faYesNO, setFaYesNo] = useState("yes");
  const newFaReq = faYesNO === "yes" ? true : false;
  const [faCode, setFaCode] = useState(0);
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

  const onDistrictChange = (values) => {
    setDistrict(values);
  };

  const onFAQChange = (e) => {
    setFaYesNo(e?.target?.value);
  };

  const onPolicyFind = async (_v) => {
    try {
      if (findPolicy) {
        setLoading(true);
        const faRes = await findFinicalAgent(findPolicy);
        setFaCode(faRes?.data?.data?.FaCode);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const leadSubPayload = {
    customerFirstname: fname || "",
    customerLastname: lastname || "",
    customerContactNo: `880${phoneNumber}`,
    district: district,
    customerEmail: email || "",
    customerPolicyNumber: findPolicy || "",
    faCode: faCode || "",
    newFaRequest: newFaReq,
    remarks: remark || "",
  };

  const onFinish = async (btnTypes, values) => {
    if (fname && phoneNumber.length === 10 && district) {
      try {
        setLoading(true);
        const sendSingleLead = await submitLeadManual(leadSubPayload);
        message.success(sendSingleLead.data.message);
        setCallBack(!callBack);
        setLoading(false);
        form.resetFields();
        if (btnTypes === "singleExit") {
          setAddLead(false);
        }
        setFaCode(0);
        setPolicyNumber("");
      } catch (error) {
        if (error?.response?.status === 401) {
          setLogoutModal(true);
        }
        setLoading(false);
        error?.response?.data?.details[0] &&
          message.error(error?.response?.data?.details[0]);
      }
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);

        const districtDisplay = await getDistrict();
        setDistrictAPI(districtDisplay.data.data);

        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 401) {
          setLogoutModal(true);
        }
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
                {
                  pattern: nameRegex,
                  message: "Name must be 3 to 350 characters long ",
                },
              ]}
            >
              <Input
                placeholder="* First Name"
                className="input_group"
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              label=""
              validateFirst={true}
              name="lastname"
              onChange={handleLastName}
              rules={[
                {
                  pattern: nameRegex,
                  message: "Name must be 3 to 350 characters long ",
                },
              ]}
            >
              <Input
                placeholder="Last Name"
                className="input_group"
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              label=""
              name="mobilenumber"
              validateFirst={true}
              onChange={handlePhoneNumber}
              rules={[
                {
                  required: true,
                  message: "Please Input Valid Phone Number",
                },
                {
                  pattern: /^(?!880|0)\d{10}$/,
                  message: "Phone number must be 10 digit, exclude 880",
                },
              ]}
            >
              <Input
                addonBefore="880"
                maxLength={10}
                placeholder={`* 17XXXXXXXX`}
              />
            </Form.Item>
            <Form.Item
              label=""
              name="email"
              validateFirst={true}
              onChange={handleEmail}
              rules={[
                {
                  pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                  message: "Invalid email address.",
                },
              ]}
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
                      <Option key={_d.id} value={_d.districtNameEng}>
                        {_d.districtNameEng}
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
                {faCode ? (
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
                        Lead submit with current FA ?
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
                      value={
                        faYesNO === "no" ? "New FA will be assigned" : faCode
                      }
                      placeholder="FA Code"
                      className="input_group"
                      readOnly
                    />
                  </div>
                ) : null}
              </Spin>
            </Form.Item>
            {faCode === null || faCode === "" ? (
              <div style={{ marginBottom: "2px" }}>
                <p style={{ color: "#6E6E6E", textAlign: "end" }}>
                  FA Status : <Tag color="#f50">FA Inactive</Tag>
                </p>
                <Input
                  value={
                    faCode === null || faCode === ""
                      ? "New FA will be assigned"
                      : null
                  }
                  placeholder="FA Code"
                  className="input_group"
                  readOnly
                  style={{ marginBottom: "15px" }}
                />
              </div>
            ) : null}
            {faCode === 0 ? (
              <Form.Item>
                {" "}
                <Input
                  placeholder="FA Code"
                  className="input_group"
                  readOnly
                />{" "}
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

      {logoutModal && (
        <LogoutModal open={logoutModal} setLogoutModal={setLogoutModal} />
      )}
    </>
  );
};

export default AddLeadModal;
