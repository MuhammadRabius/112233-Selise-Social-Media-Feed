import axios from 'axios';

export const getDistrict = async () => {

    return await axios.get(`/api/districts`);
}
export const submitLeadManual = async (payload) => {

    return await axios.post(`/api/leads`,payload);
}


export const bulkExcelUpload = async (file,header) => {

    return await axios.post(`/api/leads/bulk`,file,header);
}

export const leadList = async () => {

    return await axios.get(`/api/leads`);
}

export const leadListByID= async (id) => {

    return await axios.get(`/api/leads/${id}`);
}

export const leadUpdateByID = async (id,payload) => {

    return await axios.put(`/api/leads/${id}`, payload);
}