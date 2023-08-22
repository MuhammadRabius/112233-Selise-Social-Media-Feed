import axios from 'axios';

export const getLocations = async () => {

    return await axios.get(`/api/locations`);
}
export const getRole = async () => {

    return await axios.get(`/api/roles`);
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