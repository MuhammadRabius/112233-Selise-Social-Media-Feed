import axios from 'axios';

export const getReport = async ({fromDate, toDate,leadSourceId,email,phoneNumber} , resType) => {

    return await axios.get(`/api/leads/report/download?fromDate=${fromDate}&toDate=${toDate}&leadSourceId=${leadSourceId}&email=${email}&phoneNumber=${phoneNumber}`,resType);
}
export const getCount = async ({fromDate, toDate,leadSourceId,email,phoneNumber} ) => {

    return await axios.get(`/api/leads/count?fromDate=${fromDate}&toDate=${toDate}&leadSourceId=${leadSourceId}&email=${email}&phoneNumber=${phoneNumber}`);
}

export const getSource = async () => {

    return await axios.get(`/api/leads/source/type/list`);
}