import axios from "axios";

const prefix_api_leads = `/api/leads`;
const prefix_lead_status = `lead-status`;
const prefix_lead_sources = `lead-sources`;
const um_api_users = `/api/users`;

export const userLogin = (body) => {
  return axios.post("/api/auth/token", body);
};
export const userLogout = () => {
  return axios.get("api/auth/logout");
};

//   Dashboard

export const leadsTableView = async (fromDate, toDate, Signal) => {
  return await axios.get(
    `/api/${prefix_lead_sources}/lead-count?fromDate=${fromDate}&toDate=${toDate}`,
    Signal
  );
};

export const leadsGraphView = async (fromDate, toDate, Signal) => {
  return await axios.get(
    `/api/lead-source-types/lead-count?fromDate=${fromDate}&toDate=${toDate}`,
    Signal
  );
};

// Leads

export const getDistrict = async () => {
  return await axios.get(`/api/districts`);
};
export const submitLeadManual = async (payload) => {
  return await axios.post(`${prefix_api_leads}`, payload);
};

export const bulkExcelUpload = async (file, header) => {
  return await axios.post(`${prefix_api_leads}/bulk`, file, header);
};

export const leadListWithPagination = async (
  pageNumber,
  pageSize,
  contactNumber,
  leadStatusId
) => {
  return await axios.get(
    `${prefix_api_leads}?pageNumber=${pageNumber}&pageSize=${pageSize}&contactNumber=${contactNumber}&leadStatusId=${leadStatusId}`
  );
};

export const leadListByFiltering = async (
  pageNumber,
  pageSize,
  contactNumber
) => {
  return await axios.get(
    `${prefix_api_leads}?pageNumber=${pageNumber}&pageSize=${pageSize}&contactNumber=${contactNumber}`
  );
};

export const leadListByID = async (id) => {
  return await axios.get(`${prefix_api_leads}/${id}`);
};

export const leadUpdateByID = async (id, payload) => {
  return await axios.put(`${prefix_api_leads}/${id}`, payload);
};

export const findFinicalAgent = async (faCode) => {
  return await axios.get(`${prefix_api_leads}/agents?policyNumber=${faCode}`);
};

export const getLeadStatus = async () => {
  return await axios.get(`/api/${prefix_lead_status}`);
};

//   Report

export const reportDownloadExcel = async (
  { fromDate, toDate, leadSourceId, email, phoneNumber },
  resType
) => {
  return await axios.get(
    `api/leads/reports?fromDate=${fromDate}&toDate=${toDate}&leadSourceId=${leadSourceId}&email=${email}&phoneNumber=${phoneNumber}`,
    resType
  );
};
export const reportTotalLeadCount = async ({
  fromDate,
  toDate,
  leadSourceId,
  email,
  phoneNumber,
}) => {
  return await axios.get(
    `/api/leads/counts?fromDate=${fromDate}&toDate=${toDate}&leadSourceId=${leadSourceId}&email=${email}&phoneNumber=${phoneNumber}`
  );
};

export const getLeadSourceType = async () => {
  return await axios.get(`/api/${prefix_lead_sources}`);
};

// UserManagement

export const getLocations = async () => {
  return await axios.get(`/api/locations`);
};
export const getRole = async () => {
  return await axios.get(`/api/roles`);
};
export const getDepartment = async () => {
  return await axios.get(`/api/departments`);
};

export const createUser = async (payload) => {
  return await axios.post(`${um_api_users}`, payload);
};
export const userList = async (search) => {
  return await axios.get(`${um_api_users}?search=${search}`);
};
export const userById = async (id) => {
  return await axios.get(`${um_api_users}/${id}`);
};

export const userUpdateInformation = async (id, payload) => {
  return await axios.put(`${um_api_users}/${id}`, payload);
};

export const userActiveStatus = async (id) => {
  return await axios.patch(`${um_api_users}/${id}`);
};
