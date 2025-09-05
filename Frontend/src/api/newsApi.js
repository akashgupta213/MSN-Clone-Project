import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/news";


export const getAllNews = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};


export const getNewsById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};
