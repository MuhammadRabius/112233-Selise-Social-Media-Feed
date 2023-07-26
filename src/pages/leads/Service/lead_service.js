import axios from 'axios';

export const getDistrict = async () => {

    return await axios.get(`/api/districts`);
}
export const submitLeadManual = async (payload) => {

    return await axios.post(`/api/leads/create`,payload);
}

export const leadList = async () => {

    return await axios.get(`/api/leads/list`);
}
