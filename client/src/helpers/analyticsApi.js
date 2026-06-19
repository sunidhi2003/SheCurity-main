import axios from "axios";

const API_URL = "http://localhost:4000/api/analytics";

export const getCategoryData = async () => {
  const res = await axios.get(`${API_URL}/by-category`);
  return res.data;
};

export const getPincodeData = async () => {
  const res = await axios.get(`${API_URL}/by-pincode`);
  return res.data;
};

export const getStatusData = async () => {
  const res = await axios.get(`${API_URL}/by-status`);
  return res.data;
};

export const getTrendData = async () => {
  const res = await axios.get(`${API_URL}/trend`);
  return res.data;
};
