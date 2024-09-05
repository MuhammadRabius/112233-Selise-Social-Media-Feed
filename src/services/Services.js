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


