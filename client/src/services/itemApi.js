import axios from 'axios'

const baseUrl = "http://localhost:3000/api/items";

let token = null;

// Set token after Login
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// fetch all items
const getAllItems = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

// fetch single item
const getItemById = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

// add new item
const addItem = async (newItem) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newItem, config)
  return response.data
}

// update item
const updateItem = async (id, updateData) => {
  const config = {
    headers: { Authorization: token },

  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updateData, config)
    return response.data
  } catch (error) {
    throw error;
  }
}

// delete item
const deleteItem = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAllItems, getItemById, addItem, updateItem, deleteItem, setToken };
