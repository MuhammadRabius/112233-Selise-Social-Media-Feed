import axios from 'axios';

// lead_source

// export const demo = async (TOKEN,Signal) => await axios.get(`${api}/${api_prefix}/users/user-support-ticket/`, {headers: {
//     Authorization: `Token ${TOKEN}`
//  }}, Signal);

// ListView
export const getLeadSource = async (fromDate, toDate , Signal) => {

    return await axios.get(`/api/leads/sources/lead-count?fromDate=${fromDate}&toDate=${toDate}`,Signal);
}

// Graph
export const getLeadSourceType = async (fromDate, toDate , Signal) => {

    return await axios.get(`/api/leads/sources/types/lead-count?fromDate=${fromDate}&toDate=${toDate}`,Signal);
}
