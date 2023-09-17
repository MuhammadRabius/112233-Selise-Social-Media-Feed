import axios from "axios";

export const getDistrict = async () => {
  return await axios.get(`/api/districts`);
};
export const submitLeadManual = async (payload) => {
  return await axios.post(`/api/leads`, payload);
};

export const bulkExcelUpload = async (file, header) => {
  return await axios.post(`/api/leads/bulk`, file, header);
};

export const leadListWithPagination = async (pageNumber, pageSize,contactNumber,leadStatusId) => {
  return await axios.get(
    `/api/leads?pageNumber=${pageNumber}&pageSize=${pageSize}&contactNumber=${contactNumber}&leadStatusId=${leadStatusId}`
  );
};

export const leadListByFiltering = async (
  pageNumber,
  pageSize,
  contactNumber
) => {
  return await axios.get(
    `/api/leads?pageNumber=${pageNumber}&pageSize=${pageSize}&contactNumber=${contactNumber}`
  );
};

export const leadListByID = async (id) => {
  return await axios.get(`/api/leads/${id}`);
};

export const leadUpdateByID = async (id, payload) => {
  return await axios.put(`/api/leads/${id}`, payload);
};

export const findFinicalAgent = async (faCode) => {
  return await axios.get(`api/leads/agents?policyNumber=${faCode}`);
};

export const getLeadStatus = async () => {
  return await axios.get(`/api/leads/status`);
};
