import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Table, Input, Pagination, message } from "antd";
import UploadModal from "./CustomModal/UploadModal";
import LeadUpdateModal from "./LeadUpdateModal";
import {
  leadListWithPagination,
  leadListByFiltering,
} from "./Service/lead_service";
import "./LeadPage.css";
import AddLeadModal from "./AddLead";
import Loader from "../../components/Loader/Loader";
import { debounce } from "lodash";

const LeadsPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [callBack, setCallBack] = useState(false);
  // Filter Issues
  const [searchInput, setSearchInput] = useState("");

  // setup Field Data from API
  const [leadListView, setLeadListView] = useState([]);
  const [p_Number, set_P_Number] = useState(0);
  const [p_Size, set_P_Size] = useState(10);
  const [totalPages, setTotal] = useState(0);
  const frontPaginationNumber = p_Number + 1;
  // Table Sorting
  const [sortedInfo, setSortedInfo] = useState({});



  // Search Component
  const debouncedSearch = debounce((s_value) => {
    setSearchInput(s_value);
    set_P_Number(0)
  }, 1000);

  const phoneNumberSearch = (e) => {
    debouncedSearch(e?.target?.value);
  };
  const onSearchClick = async (e) => {
    debouncedSearch();

  };

  // Modal Section ----------

  // Bulk component
  const [isBulkModal, setBulkUpModal] = useState(false);
  const showBUModal = () => {
    setBulkUpModal(true);
  };

  // add lead component
  const [isAddLead, setAddLead] = useState(false);
  const showADModal = () => {
    setAddLead(true);
  };

  // Update Single Lead ModaL

  const [updateLeadModal, setUpdateLeadModal] = useState(false);
  const [singleID, setSingleID] = useState(0);

  const showLeadUpdateMOdal = (id) => {
    setSingleID(id);
    setUpdateLeadModal(true);
  };

  const updateModalCancel = () => {
    setUpdateLeadModal(false);
  };

  // setIndexNumber

  const onPaginationChange = (pageNumber, pageSize) => {
    const pageNum = pageNumber - 1;
    set_P_Number(pageNum);
    set_P_Size(pageSize);
  };

  // Table Data
  const onTableChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };

  // Api Calling ----------

  const getApiCall = async () => {
    try {
      setLoading(true);

      const leadDisplay =
        searchInput.length !== ""
          ? await leadListWithPagination(p_Number, p_Size, searchInput)
          : await leadListWithPagination(p_Number, p_Size,searchInput);
      setLeadListView(leadDisplay?.data?.data?.items);
      setTotal(leadDisplay?.data?.data?.totalItems);
      set_P_Number(...p_Number, leadDisplay?.data?.data?.pageNumber);
      set_P_Size(...p_Size, leadDisplay?.data?.data?.pageSize);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getApiCall();

    return () => ac.abort();
  }, [callBack, p_Number, p_Size, searchInput]);

  // const getFilterData = useMemo(() =>  {

  //   let d = leadListView;

  //   if (search) {
  //       d = leadListView.filter(data => data.name.includes(search) || data.phone.includes(search))
  //   }

  //   return d

  // }, [search])

  // Data Table Colum

  const columns = [
    {
      title: "Date",
      dataIndex: "leadDate",
      key: "leadDate",
      sorter: (a, b) => new Date(a.leadDate) - new Date(b.leadDate),
      sortOrder: sortedInfo.columnKey === "leadDate" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a?.firstName.localeCompare(b?.firstName),
      sortOrder: sortedInfo.columnKey === "firstName" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a?.lastName?.length - b?.lastName?.length,
      sortOrder: sortedInfo.columnKey === "lastName" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
    },
    {
      title: "Mobile No",
      dataIndex: "contactNo",
      key: "contactNo",
      sorter: (a, b) => a?.contactNo - b?.contactNo,
      sortOrder: sortedInfo.columnKey === "contactNo" ? sortedInfo.order : null,
      ellipsis: true,
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
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],

      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 1,
      // },
    },
    {
      title: "Sources",
      dataIndex: "leadSourceName",
      key: "leadSourceName",
      sorter: (a, b) => a?.leadSourceName?.length - b?.leadSourceName?.length,
      sortOrder:
        sortedInfo.columnKey === "leadSourceName" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 1,
      // },
    },
    {
      title: "Status",
      dataIndex: "leadStatus",
      key: "leadStatus",
      sorter: (a, b) => a?.leadStatus?.length - b?.leadStatus?.length,
      sortOrder:
        sortedInfo.columnKey === "leadStatus" ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (leadStatus) => {
        return leadStatus === "Verified" || leadStatus === "Sent To UAA" ? (
          <>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "#A4CE4E",
                border: "1px solid #FFFFFF",
                borderRadius: "14px",
                marginLeft: "15px",
              }}
            ></div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "#D42123",
                border: "1px solid #FFFFFF",
                borderRadius: "14px",
                marginLeft: "15px",
              }}
            ></div>{" "}
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      sortDirections: ["descend", "ascend"],
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
  ];

  return (
    <>
      <Layout pageName={"Leads"}>
        <div className="lead-container">
          <p className="bt_Text">Lead Submission</p>

          {/* Add and Search Section-------------------------- */}
          <div className="lead_S_Btn">
            <div className="lead-search">
              <Input
                onChange={phoneNumberSearch}
                placeholder="Search by 11 digit Phone No. e.g 017-XXXXXXXX  "
                className="filterlead"
                type="text"
                name="fname"
                // maxLength={13}
              />
              <span style={{ cursor: "pointer" }} onClick={onSearchClick}>
                <i
                  className="pi pi-search"
                  style={{ color: "var(--primary-color)" }}
                ></i>
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

          {/* Lead Submission Table View---------- */}
          <div className="__l_sub_table">
            <div>
              <Table
                size="small"
                key={leadListView.totalItems}
                loading={isLoading}
                columns={columns}
                dataSource={leadListView}
                pagination={false}
                onChange={onTableChange}
                tableLayout="fixed"
              />
            </div>
          </div>

          {/* Lead Generation Pagination */}

          <div className="pgn_ld_sb">
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
