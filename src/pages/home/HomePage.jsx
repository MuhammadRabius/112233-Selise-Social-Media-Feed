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
import { DatePicker, message } from "antd";
import { getGrapFillColor } from "../../global_state/action";
import { getLeadSource, getLeadSourceType } from "./Service/homepage_action";
import Loader from "../../components/loader/Loader";
import LogoutModal from "../../components/SessionOutModal/LogoutModal";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const HomePage = ({ isLoad, onChange, disabledDate, testData }) => {
  const dateFormat = "YYYY-MM-DD";
  const [logoutModal, setLogoutModal] = useState(false);
  const [isLoading, setLoading] = useState(isLoad === "false" ? false : true);
  const [tData, setTData] = useState([]);
  const [gData, setGData] = useState([]);
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [fromDate, setFormDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const onDateChange = (date, dateString) => {
    setToDate(dateString[1]);
    setFormDate(dateString[0]);
  };

  const renderIndexColum = (rowIndex, column) => {
    return column.rowIndex + 1;
  };

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        if (toDate && fromDate) {
          setLoading(isLoad === "false" ? false : true);
          const tableDisplay = await getLeadSource(fromDate, toDate);
          const typeDisplay = await getLeadSourceType(fromDate, toDate);

          setTData(tableDisplay.data.data);
          setGData(typeDisplay.data.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.response.status !== 200) {
          setLogoutModal(true);
          setLoading(false);
          return;
        }
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [fromDate, toDate]);

  return (
    <>
      <Layout pageName={"Dashboard"}>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <>
            <div className="homePage-content" data-testid="dashboard-mock">
              {" "}
              <p className="bt_Text" data-testid="home-graph">
                Leads Overview
              </p>
              <div className="date_rage">
                <RangePicker
                  data-testid="date-picker"
                  onChange={onDateChange || onChange}
                  defaultValue={[dayjs(fromDate), dayjs(toDate)]}
                  format={dateFormat}
                  disabledDate={(current) =>
                    current.isAfter(dayjs() || disabledDate)
                  }
                />
              </div>
              <div className="chart_section" data-testid="chartContent-mock">
                <div className="char-bar">
                  <small>Leads</small>
                  <BarChart width={900} height={300} data={gData || testData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip data-testid="tooltip" />
                    <XAxis
                      dataKey="leadSourceTypeName"
                      tickSize={2}
                      padding={{ right: 90 }}
                      label={{
                        value: "Source Type",
                        position: "insideBottomRight",

                        fill: "black",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    />

                    <YAxis width={50} tickSize={2} />

                    <Bar barSize={60} dataKey="totalLeadSentToUaa">
                      {gData.map((entry, index) => {
                        const color = getGrapFillColor(
                          entry.leadSourceTypeName
                        );
                        return <Cell fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </div>
              </div>
              <p className="bt_Text" data-testid="home-table">
                Lead Sources
              </p>
              <div className="card">
                <DataTable
                  data-testid="table-mock"
                  key={tData.id}
                  value={tData}
                  tableStyle={{ minWidth: "50rem" }}
                >
                  <Column
                    field="index"
                    header="SL No."
                    body={renderIndexColum}
                  ></Column>
                  <Column field="leadSourceName" header="Source"></Column>
                  <Column
                    field="totalLeadSentToUaa"
                    header="To MyLife"
                  ></Column>
                  <Column field="totalLeadPending" header="Pending"></Column>
                  <Column field="totalLead" header="Total"></Column>
                </DataTable>
              </div>
            </div>
          </>
        )}
      </Layout>
      {logoutModal && (
        <LogoutModal open={logoutModal} setLogoutModal={setLogoutModal} />
      )}
    </>
  );
};

export default HomePage;
