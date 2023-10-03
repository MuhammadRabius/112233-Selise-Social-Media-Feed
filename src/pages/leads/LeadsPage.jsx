import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Table, Input, Pagination, Select, Tag, Tooltip } from "antd";
import UploadModal from "./CustomModal/UploadModal";
import LeadUpdateModal from "./LeadUpdateModal";
import { getLeadStatus, leadListWithPagination } from "./Service/lead_service";
import "./LeadPage.css";
import AddLeadModal from "./AddLead";
import { debounce } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import { ErrorColorCode } from "../../global_state/action";

const LeadsPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [callBack, setCallBack] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const [leadListView, setLeadListView] = useState([]);
  const [p_Number, set_P_Number] = useState(0);
  const [p_Size, set_P_Size] = useState(10);
  const [totalPages, setTotal] = useState(0);
  const frontPaginationNumber = p_Number + 1;

  const [sortedInfo, setSortedInfo] = useState({});
  const [tableStatus, setTableStatus] = useState([]);
  const [leadStatusId, setLeadStatusId] = useState("all");

  const debouncedSearch = debounce((s_value) => {
    setSearchInput(s_value);
    set_P_Number(0);
  }, 1000);

  const onLeadStatusChange = (v) => {
    setLeadStatusId(v);
    set_P_Number(0);
  };

  const phoneNumberSearch = (e) => {
    debouncedSearch(e?.target?.value);
  };
  const onSearchClick = async (e) => {
    getApiCall();
  };

  const [isBulkModal, setBulkUpModal] = useState(false);
  const showBUModal = () => {
    setBulkUpModal(true);
  };

  const [isAddLead, setAddLead] = useState(false);
  const showADModal = () => {
    setAddLead(true);
  };

  const [updateLeadModal, setUpdateLeadModal] = useState(false);
  const [singleID, setSingleID] = useState(0);

  const showLeadUpdateMOdal = (id) => {
    setSingleID(id);
    setUpdateLeadModal(true);
  };

  const updateModalCancel = () => {
    setUpdateLeadModal(false);
  };

  const onPaginationChange = (pageNumber, pageSize) => {
    const pageNum = pageNumber - 1;
    set_P_Number(pageNum);
    set_P_Size(pageSize);
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };

  const getApiCall = useCallback(async () => {
    try {
      setLoading(true);

      const leadStatusDisplay = await getLeadStatus();
      setTableStatus(leadStatusDisplay.data.data);
      const updateLeadStatusId = leadStatusId === "all" ? "" : leadStatusId;
      const leadDisplay = await leadListWithPagination(
        p_Number,
        p_Size,
        searchInput,
        updateLeadStatusId
      );
      setLeadListView(leadDisplay?.data?.data?.items);
      setTotal(leadDisplay?.data?.data?.totalItems);
      set_P_Number(...p_Number, leadDisplay?.data?.data?.pageNumber);
      set_P_Size(...p_Size, leadDisplay?.data?.data?.pageSize);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [callBack, p_Number, p_Size, searchInput, leadStatusId]);

  useEffect(() => {
    const ac = new AbortController();
    getApiCall();
    return () => ac.abort();
  }, [getApiCall]);

  const columns = [
    {
      title: "Date",
      dataIndex: "leadDate",
      key: "leadDate",
      sorter: (a, b) => new Date(a.leadDate) - new Date(b.leadDate),
      sortOrder: sortedInfo.columnKey === "leadDate" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      width: 200,
    },
    {
      title: "Full Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a?.firstName.localeCompare(b?.firstName),
      sortOrder: sortedInfo.columnKey === "firstName" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      width: 200,
      responsive: ["sm"],
      render: (firstName, _d) => {
        return (
          <p>
            {_d.firstName}
            {_d.lastName}
          </p>
        );
      },
    },

    {
      title: "Mobile No",
      dataIndex: "contactNo",
      key: "contactNo",
      sorter: (a, b) => a?.contactNo - b?.contactNo,
      sortOrder: sortedInfo.columnKey === "contactNo" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a?.email?.length - b?.email?.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "District",
      dataIndex: "districtName",
      key: "districtName",
      sorter: (a, b) => a?.districtName?.length - b?.districtName?.length,
      sortOrder:
        sortedInfo.columnKey === "districtName" ? sortedInfo.order : null,

      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Sources",
      dataIndex: "leadSourceName",
      key: "leadSourceName",
      sorter: (a, b) => a?.leadSourceName?.length - b?.leadSourceName?.length,
      sortOrder:
        sortedInfo.columnKey === "leadSourceName" ? sortedInfo.order : null,
      width: 100,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Status",
      dataIndex: "leadStatus",
      key: "leadStatus",
      sorter: (a, b) => a?.leadStatus?.length - b?.leadStatus?.length,
      sortOrder:
        sortedInfo.columnKey === "leadStatus" ? sortedInfo.order : null,
      width: 80,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (leadStatus) => {
        return (
          <Tooltip title={`${leadStatus}`}>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: ErrorColorCode(leadStatus),
                border: "1px solid #FFFFFF",
                borderRadius: "14px",
                marginLeft: "15px",
              }}
            ></div>
          </Tooltip>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      sortDirections: ["descend", "ascend"],
      width: 80,
      responsive: ["sm"],
      render: (states, _data) => {
        return _data?.leadStatus === "Not Verified" ? (
          <>
            <NavLink onClick={(e) => showLeadUpdateMOdal(_data.leadId)}>
              Edit
            </NavLink>
          </>
        ) : (
          <NavLink disabled>Edit</NavLink>
        );
      },
    },
    {
      title: "Validation Message",
      dataIndex: "validationErrorMessage",
      key: "validationErrorMessage",
      width: "auto",
      render: (validationErrorMessage) => {
        return validationErrorMessage.map((_d) => {
          return (
            <Tag style={{ display: "block" }} color="red">
              {_d}
            </Tag>
          );
        });
      },
    },
  ];

  return (
    <>
      <Layout pageName={"Leads"}>
        <div className="lead-container">
          <p className="bt_Text" data-testid="leads-mock">
            Lead Submission
          </p>

          <div className="lead_S_Btn">
            <div className="lead-search">
              <Input
                onChange={phoneNumberSearch}
                placeholder="Search by 11 digit Phone No. e.g 017-XXXXXXXX  "
                className="filterlead"
                type="text"
                name="fname"
              />
              <span style={{ cursor: "pointer" }} onClick={onSearchClick}>
                <SearchOutlined className="pi-search" />
              </span>
            </div>

            <div className="add-lead-group">
              <button className="btn_group me-4" onClick={showBUModal}>
                BULK UPLOAD
              </button>
              <button className="btn_group" onClick={showADModal}>
                + ADD LEAD
              </button>
            </div>
          </div>

          <div className="filter_tableStatus">
            <Select
              className="filter_select"
              value={leadStatusId}
              style={{
                width: "150px",
              }}
              onChange={(value) => onLeadStatusChange(value)}
            >
              <Select.Option value="all">All</Select.Option>
              {tableStatus.map((_d) => {
                return (
                  <>
                    <Select.Option key={_d.id} value={_d.id}>
                      {_d.name}
                    </Select.Option>
                  </>
                );
              })}
            </Select>
          </div>

          <div className="__l_sub_table">
            <div>
              <Table
                size="middle"
                rowKey="key"
                loading={isLoading}
                columns={columns}
                dataSource={leadListView}
                pagination={false}
                onChange={onTableChange}
                tableLayout="auto"
                scroll={{
                  x: 500,
                }}
              />
            </div>
          </div>

          {/* Lead Generation Pagination */}

          <div className="lead-pagination">
            <Pagination
              showQuickJumper
              current={frontPaginationNumber}
              total={totalPages}
              onChange={onPaginationChange}
            />
          </div>

          {isBulkModal && (
            <UploadModal
              open={isBulkModal}
              onCancel={() => setBulkUpModal(false)}
              setBulkUpModal={setBulkUpModal}
              callBack={callBack}
              setCallBack={setCallBack}
            />
          )}

          {isAddLead && (
            <AddLeadModal
              open={isAddLead}
              setAddLead={setAddLead}
              callBack={callBack}
              setCallBack={setCallBack}
              setLoading={setLoading}
              isLoading={isLoading}
            />
          )}
        </div>
      </Layout>

      {updateLeadModal && (
        <LeadUpdateModal
          key={singleID}
          singleID={singleID}
          open={updateLeadModal}
          onCancel={() => updateModalCancel(false)}
          setUpdateLeadModal={setUpdateLeadModal}
          callBack={callBack}
          setCallBack={setCallBack}
        />
      )}
    </>
  );
};

export default LeadsPage;
