import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DatePicker, Spin } from "antd";
import "./homePage.css";
import { getGrapFillColor } from "../../global_state/action";
import { getLeadSource, getLeadSourceType } from "./Service/homepage_action";
import { LoadingOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const dateFormat = "YYYY-MM-DD";
  const [isLoading, setIsloading] = useState(false);
  // Spin
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 44,
      }}
      spin
    />
  );
  // Lead Source Grap
  const renderIndexColum = (rowIndex, column) => {
    return column.rowIndex + 1;
  };

  // __Lead Source Data Table__
  const [tData, setTData] = useState([]);
  const [gData, setGData] = useState([]);
  //  console.log('tdata',tData)
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [fromDate, setFormDate] = useState(
    dayjs().add(-1, "month").format("YYYY-MM-DD")
  );

  // Leads Table----y
  const onChange = (date, dateString) => {
    setToDate(dateString[1]);
    setFormDate(dateString[0]);
  };

  // Data fetching on table

  useEffect(() => {
    const ac = new AbortController();

    try {
      (async () => {
        if (toDate && fromDate) {
          setIsloading(true);
          // Table API
          const tableDisplay = await getLeadSource(fromDate, toDate);
          setTData(tableDisplay.data.data);

          // Grap API

          const typeDisplay = await getLeadSourceType(fromDate, toDate);
          setGData(typeDisplay.data.data);
        }
        setIsloading(false);
      })();
    } catch (error) {
      setIsloading(false);
      console.log(error.message);
      // err.respose.data.message && message.error(err.respose.data.message)
    }

    return () => ac.abort();
  }, [fromDate, toDate]);

  return (
    <>
      <Spin indicator={antIcon} spinning={isLoading}>
        <Layout pageName={"Dashboard"}>
          <p className="bt_Text">Leads Overview</p>
          {/* Date Pickup Filter  */}

          <div className="date_rage">
            <RangePicker
              onChange={onChange}
              defaultValue={[dayjs().add(-1, "month"), dayjs()]}
              format={dateFormat}
            />
          </div>
          {/* Dates Section------ */}

          {/* Chart Section------ */}
          <div className="chart_section">
            <div className="char-bar">
              <BarChart
                width={900}
                height={300}
                data={gData}
                loading={isLoading}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="leadSourceTypeName"
                  tickSize={2}
                  padding={{ right: 90 }}
                  label={{
                    value: "Source",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />

                <YAxis width={50} tickSize={2} />
                <Tooltip />

                <Bar
                  barSize={60}
                  dataKey="totalLeadSentToUaa"
                  
                >
                  {gData.map((entry, index) => {
                    const color = getGrapFillColor(entry.leadSourceTypeName);
                    return <Cell fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </div>
          </div>

          {/* Lead Source Table------ */}
          <p className="bt_Text">Lead Sources</p>

          <div className="card">
            <DataTable
              value={tData}
              loading={isLoading}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="index"
                header="SL No."
                body={renderIndexColum}
              ></Column>
              <Column field="leadSourceName" header="Source"></Column>
              <Column field="totalLeadSentToUaa" header="TO UAA"></Column>
              <Column field="totalLeadPending" header="Pending"></Column>
              <Column field="totalLead" header="Total"></Column>
            </DataTable>
          </div>

          {/* Modal Section */}
        </Layout>
      </Spin>
    </>
  );
};

export default HomePage;


