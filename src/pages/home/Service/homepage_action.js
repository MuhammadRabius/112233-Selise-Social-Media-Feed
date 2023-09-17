import axios from "axios";

export const getLeadSource = async (fromDate, toDate, Signal) => {
  return await axios.get(
    `/api/leads/sources/lead-count?fromDate=${fromDate}&toDate=${toDate}`,
    Signal
  );
};

export const getLeadSourceType = async (fromDate, toDate, Signal) => {
  return await axios.get(
    `/api/leads/sources/types/lead-count?fromDate=${fromDate}&toDate=${toDate}`,
    Signal
  );
};
