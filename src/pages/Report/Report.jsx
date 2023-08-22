import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { DatePicker, Input, Form, message, Select, Spin, Space } from "antd";
import "./Report.css";
import dayjs from "dayjs";
import { getCount, getReport, getSource } from "./Service/Report_Service";
import { LoadingOutlined } from "@ant-design/icons";
import { validatePhoneNumber } from "../../Validation/Validation";
import { mobileValidation, phoneStatus } from "../../global_state/action";
const { Option } = Select;

const Report = () => {
  const [form] = Form.useForm();
  const [dataCount, setDataCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadSourceId, setLeadId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const[updatePhon,setUpdatePhon]=useState("")
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [leadSorce, setLeadSource] = useState([]);
  const [callBack,setCallBack]=useState(false)
  const onChangeStart = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChangeEnd = (date, dateString) => {
    setEndDate(dateString);
  };
  const onChangeSourceType = (e) => {
    setLeadId(e);
  };
  
  // Spin
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const onFinish = async (values) => {

    if((values?.mobileNumber !== undefined) && (values?.mobileNumber !== "") && (values?.mobileNumber?.length !== 10)){
      return message.warning("Please input valid mobile number. Must be 10 digit exclude 880") 
    }
    
    const phoneUpdate = (values?.mobileNumber === undefined) ||( values?.mobileNumber === "") ? "" : `880${values?.mobileNumber}`;



    const payload = {
      fromDate: startDate,
      toDate: endDate,
      leadSourceId: leadSourceId || "",
      email: values?.email || "",
      phoneNumber: phoneUpdate,
    };

    try {
      setLoading(true);
      if (startDate && endDate) {
        const display = await getCount(payload);
        setDataCount(display?.data?.data);
      }
      // const res = await getReport(
      //   payload,
      //   { responseType: "blob" },
      //   { "Content-Type": "application/octet-stream" }
      // );
      // const url = window.URL.createObjectURL(new Blob([res?.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute(
      //   "download",
      //   `LeadCount-Report ${dayjs().format("YYYY-MM-DD")}.xlsx`
      // );
      // document.body.appendChild(link);
      // link.click();
      setCallBack(!callBack)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error?.response?.data?.details[0] &&
          message.error(error?.response?.data?.details[0]);
    }
  };

  //  api calling ---
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        //
        const leadSource = await getSource();
        setLeadSource(leadSource?.data?.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        error?.response?.data?.details[0] &&
          message.error(error?.response?.data?.details[0]);
      }
    })();

    return () => ac.abort();
  }, []);

  return (
    <Spin indicator={antIcon} spinning={isLoading}>
      <Layout pageName={"Report"}>
        <p className="bt_Text">Report</p>
        <div className="reportContainer">
          <Form
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="report_form">
              <Form.Item
                label=""
                name="startdate"
                rules={[
                  {
                    required: true,
                    message: "Please input Start Date!",
                  },
                ]}
              >
                <DatePicker
                  className="_input_group"
                  onChange={onChangeStart}
                  format={`YYYY-MM-DD`}
                  suffixIcon={false}
                  placeholder="Start Day!"
                  disabledDate={(current) => current.isAfter(dayjs().add(-1, 'day'))}
                />
              </Form.Item>
              <Form.Item
                label=""
                name="enddate"
                rules={[
                  {
                    required: true,
                    message: "Please input End Date!",
                  },
                ]}
              >
                <DatePicker
                  className="_input_group"
                  onChange={onChangeEnd}
                  format={`YYYY-MM-DD`}
                  suffixIcon={false}
                  placeholder="End Day!"
                  disabledDate={(current) => current.isAfter(dayjs())}
                />
              </Form.Item>

              <Form.Item name="leadsource" label="">
                <Select
                  allowClear
                  showSearch
                  placeholder="Source Type"
                  onChange={onChangeSourceType}
                >
                  {leadSorce.map((_d) => {
                    return (
                      <>
                        <Option key={_d?.id} value={_d?.id}>
                          {_d?.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item label="" name="email">
                <Input
                  className="_input_group"
                  placeholder="Email"
                  type="email"
                />
              </Form.Item>
              <Form.Item
                label=""
                name="mobileNumber"
              >
                <Input
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value.replace(/^0/g, ""))}
                  className="_input_group"
                  addonBefore="880"
                  placeholder="1777345678"
                  type="number"
                  min={1}
                />
                </Form.Item>
              
            </div>

            <div className="footer_part">
              <span className="spanText">
                {`Total Lead Count : ${dataCount === 0 ? "No Data Found" : `${dataCount}` }`}{" "}
              </span>
              <Form.Item>
                <button className="submit_btn" htmltype="submit">
                  DOWNLOAD IN EXCEL
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Layout>
    </Spin>
  );
};

export default Report;
