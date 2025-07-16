import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/news";

// Get all news
export const getAllNews = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Get news by ID
export const getNewsById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};
