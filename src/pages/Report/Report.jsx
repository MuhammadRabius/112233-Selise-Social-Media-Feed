import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { DatePicker, Input, Form, message, Select } from "antd";
import "./Report.css";
import dayjs from "dayjs";
import {
  LeadCountStatus,
  ReportExcelDownload,
} from "../../global_state/action";
import Loader from "../../components/loader/Loader";
import LogoutModal from "../../components/SessionOutModal/LogoutModal";
import { getLeadSourceType, reportDownloadExcel, reportTotalLeadCount } from "../../services/Services";
const { Option } = Select;

const Report = ({ isLoad }) => {
  const [form] = Form.useForm();
  const [logoutModal, setLogoutModal] = useState(false);
  const [dataCount, setDataCount] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadSourceId, setLeadId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setLoading] = useState(isLoad === "false" ? false : true);
  const [leadSorce, setLeadSource] = useState([]);
  const [callBack, setCallBack] = useState(false);
  const onChangeStart = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChangeEnd = (date, dateString) => {
    setEndDate(dateString);
  };
  const onChangeSourceType = (e) => {
    setLeadId(e);
  };

  const onFinish = async (values) => {
    if (
      values?.mobileNumber !== undefined &&
      values?.mobileNumber?.charAt(0) === "0"
    ) {
      return message.warning(
        "Please input valid mobile number. Must be 10 digit exclude 880"
      );
    }

    const phoneUpdate =
      values?.mobileNumber === undefined || values?.mobileNumber === ""
        ? ""
        : `880${values?.mobileNumber}`;

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
        const display = await reportTotalLeadCount(payload);
        setDataCount(display?.data?.data);
      }
      const res = await reportDownloadExcel(
        payload,
        { responseType: "blob" },
        { "Content-Type": "application/octet-stream" }
      );
      ReportExcelDownload(res?.data);
      setCallBack(!callBack);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(isLoad === "false" ? false : true);
        const leadSource = await getLeadSourceType();
        setLeadSource(leadSource?.data?.data);

        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 401) {
          setLogoutModal(true);
        }
        setLoading(false);
        error?.response?.data?.details[0] &&
          message.error(error?.response?.data?.details[0]);
      }
    })();

    return () => ac.abort();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />

      <Layout pageName={"Report"}>
        <div className="reportComponent_mock">
          <p className="bt_Text" data-testid="report_mock">
            Report
          </p>
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
                    data-testid="start-day"
                    className="_input_group"
                    onChange={onChangeStart}
                    format={`YYYY-MM-DD`}
                    suffixIcon={false}
                    placeholder="Start Day"
                    disabledDate={(current) =>
                      current.isAfter(dayjs().add(-1, "day"))
                    }
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
                    data-testid="end-day"
                    className="_input_group"
                    onChange={onChangeEnd}
                    format={`YYYY-MM-DD`}
                    suffixIcon={false}
                    placeholder="End Day"
                    disabledDate={(current) => current.isAfter(dayjs())}
                  />
                </Form.Item>

                <Form.Item name="leadsource" label="">
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    placeholder="Source Type"
                    data-testid="source_select"
                    onChange={onChangeSourceType}
                  >
                    {leadSorce.map((_d) => {
                      return (
                        <>
                          <Option key={_d?.id} value={_d?.id} label={_d?.name}>
                            {_d?.name}
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
                      pattern:
                        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                      message: "Invalid email address.",
                    },
                  ]}
                >
                  <Input
                    className="_input_group"
                    placeholder="Email"
                    type="email"
                    data-testid="report-email"
                  />
                </Form.Item>
                <Form.Item
                  label=""
                  name="mobileNumber"
                  rules={[
                    {
                      pattern: /^(?!880|0)\d{10}$/,
                      message: "Phone number must be 10 digit, exclude 880",
                    },
                  ]}
                >
                  <Input
                    data-testid="report-mobileNo"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/^0/g, ""))
                    }
                    className="_input_group"
                    addonBefore="880"
                    placeholder="177XXXXXXX"
                    maxLength={10}
                  />
                </Form.Item>
              </div>

              <div className="footer_part">
                <span className="spanText" data-testid="lead-count-mock">
                  {`Total Lead Count : ${
                    dataCount === 0 || dataCount === null
                      ? `${LeadCountStatus(dataCount)}`
                      : `${dataCount}`
                  }`}{" "}
                </span>
                <Form.Item>
                  <button
                    className="submit_btn"
                    htmlType="submit"
                    data-testid="submit-mock"
                  >
                    DOWNLOAD IN EXCEL
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </Layout>

      {logoutModal && (
        <LogoutModal open={logoutModal} setLogoutModal={setLogoutModal} />
      )}
    </>
  );
};

export default Report;
