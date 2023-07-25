import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { DatePicker, Input, Form, Button, Select } from "antd";
import "./Report.css";
import { getCount, getReport, getSource } from "./Service/Report_Service";
const { Option } = Select;
const Report = () => {
  const [form] = Form.useForm();
  const [dataCount,setDataCount]=useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadSourceId, setLead] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading,setLoading]=useState(false);
  const [leadSorce,setLeadSource]=useState([])
   
  const onChangeStart = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChangeEnd = (date, dateString) => {
    setEndDate(dateString);
  };

  function saveAsXlsxFile(base64) {

    var mediaType =

      "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

    var a = document.createElement("a");

    a.href = mediaType + base64;

    a.id = "abc";

    //a.href = mediaType+userInp;

    var date = new Date().toJSON().slice(0, 10);

    // var date = new Date();

    a.download = `${date}.xlsx`;

    a.textContent = "Download file!";

    // console.log(a)

    document.body.appendChild(a);

    document.getElementById("abc")?.click();

  }




  const onFinish = (values) => {
    setEmail(values.email);
    setLead(values.leadsource);
    setphoneNumber(values.mobilenumber);

    const payload ={
      "fromDate": startDate,
      "toDate": endDate,
      "leadSourceId": leadSourceId || "",
      "email":email  || "",
      "phoneNumber":phoneNumber || "",

    }
    
    try {
      (async () => {
       
        setLoading(true);
        if (startDate && endDate) {

          const display = await getCount(payload)
          setDataCount(display.data.data)
        }
        const display = await getReport(payload , { responseType: 'blob'},{'Content-Type': 'application/octet-stream'});
        const url = window.URL.createObjectURL(new Blob([display.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        // const fileData = await display.data.blob()
        console.log("report data", display);
        
        // saveAsXlsxFile(fileData)
       
        
      })();
    } catch (error) {
      console.log(error.message);
      // err.respose.data.message && message.error(err.respose.data.message)
    }
  };

  console.log("data", )
  //  api calling ---
  useEffect(() => {
    const ac = new AbortController();
    
    (async () => {
      try {
        setLoading(true);
        //
        const districtDisplay = await getSource();
        console.log("data",districtDisplay.data.data)
        setLeadSource(districtDisplay.data.data);
        
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Something went wrong");
      }
    })();

    return () => ac.abort();
  }, []);


  return (
    <Layout pageName={"Report"}>
      <p className="bt_Text">Report</p>
      <div className="reportContainer">
        <Form
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
                showToday
              />
            </Form.Item>

            <Form.Item
              name="leadsource"
              label=""
              
            >
            <Select allowClear showSearch placeholder="Source Type">
            {
              leadSorce.map((_d) => {
              console.log("leadSorce", _d.leadSourceType);
              return (
                <>
                  <Option key={_d.id} value={_d.id}>
                    {_d.name}
                  </Option>
                </>
              );
            })}
          </Select>
            </Form.Item>

            <Form.Item
              label=""
              name="email"
              
            >
              <Input className="_input_group" placeholder="Email" />
            </Form.Item>
            <Form.Item
              label=""
              name="mobilenumber"
              
            >
              <Input
                className="_input_group"
                placeholder="Mobile number"
                maxLength={11}
              />
            </Form.Item>
          </div>

          <div className="footer_part">
            <span className="spanText">{`Total Lead Count : ${dataCount}`} </span>
            <Form.Item>
              <button className="submit_btn" htmlType="submit">
                DOWNLOAD IN EXCEL
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Report;
