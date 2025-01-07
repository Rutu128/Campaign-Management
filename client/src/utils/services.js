import axios from "axios";

export const baseUrl = "http://localhost:3000";

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; 
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
    };
  }
};
