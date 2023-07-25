import axios from 'axios';

export const getDistrict = async () => {

    return await axios.get(`/api/districts`);
}
export const getRole = async () => {

    return await axios.get(`/api/role/list`);
}
export const getDepartment = async () => {

    return await axios.get(`/api/departments`);
}

export const createUser = async (payload) => {

    return await axios.post(`/api/users`,payload);
}
export const userList = async () => {

    return await axios.get(`/api/users`);
}