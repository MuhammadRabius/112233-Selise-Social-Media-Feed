import axios from "axios";

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
  return await axios.post(`/api/users`, payload);
};
export const userList = async (search) => {
  return await axios.get(`/api/users?search=${search}`);
};
export const userById = async (id) => {
  return await axios.get(`/api/users/${id}`);
};

export const userUpdateInformation = async (id, payload) => {
  return await axios.put(`api/users/${id}`, payload);
};

export const userActiveStatus = async (id) => {
  return await axios.patch(`api/users/${id}`);
};
