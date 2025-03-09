import axios from 'axios'

const baseUrl = "http://localhost:3000/api/auth";

// register user

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/register`, userData)
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Login user

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, userData)
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}