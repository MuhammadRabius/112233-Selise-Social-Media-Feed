import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
import { DatePicker, Spin, message } from "antd";
import "./homePage.css";
import { getGrapFillColor } from "../../global_state/action";
import { getLeadSource, getLeadSourceType } from "./Service/homepage_action";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../../components/Loader/Loader.tsx";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const HomePage = () => {
  const dateFormat = "YYYY-MM-DD";
  const [isLoading, setIsloading] = useState(false);
  const [tData, setTData] = useState([]);
  const [gData, setGData] = useState([]);
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [fromDate, setFormDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );

  // Leads Table----y
  const onChange = (date, dateString) => {
    setToDate(dateString[1]);
    setFormDate(dateString[0]);
  };

  // Lead Source Grap
  const renderIndexColum = (rowIndex, column) => {
    return column.rowIndex + 1;
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
    } catch (err) {
      setIsloading(false);
      err.response.data.message && message.error(err.response.data.message);
    }

    return () => ac.abort();
  }, [fromDate, toDate]);

  return (
    <>
      <Layout pageName={"Dashboard"}>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <>
            <p className="bt_Text">Leads Overview</p>

            <div className="date_rage">
       
              <RangePicker
                onChange={onChange}
                value={[
                  dayjs(fromDate ? fromDate : dayjs().add(-1, "month")),
                  dayjs(toDate ? toDate : dayjs()),
                ]}
                format={dateFormat}
                disabledDate={(current) => current.isAfter(dayjs())}
              />
            </div>

            <div className="chart_section">
              <div className="char-bar">
                <small>Leads</small>
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
                      value: "Source Type",
                      position: "insideBottomRight",
                      // offset: -1,
                      fill: "black",
                      fontSize: "12",
                      fontWeight: "500",
                    }}
                  />

                  <YAxis width={50} tickSize={2} />

                  <Bar barSize={60} dataKey="totalLeadSentToUaa">
                    {gData.map((entry, index) => {
                      const color = getGrapFillColor(entry.leadSourceTypeName);
                      return <Cell fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </div>
            </div>

            <p className="bt_Text">Lead Sources</p>

            <div className="card">
              <DataTable
                key={tData.id}
                value={tData}
                // loading={isLoading}
                tableStyle={{ minWidth: "50rem" }}
              >
                <Column
                  field="index"
                  header="SL No."
                  body={renderIndexColum}
                ></Column>
                <Column field="leadSourceName" header="Source"></Column>
                <Column field="totalLeadSentToUaa" header="TO MyLife"></Column>
                <Column field="totalLeadPending" header="Pending"></Column>
                <Column field="totalLead" header="Total"></Column>
              </DataTable>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default HomePage;
