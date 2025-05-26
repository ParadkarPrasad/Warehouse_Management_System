import axios from 'axios'

const baseUrl = "http://localhost:3000/api/items";

// Helper to get auth config from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

//fetch all items
const getAllItems = async () => {
  const response = await axios.get(baseUrl, getAuthConfig());
  return response.data;
};


// fetch single item
const getItemById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthConfig())
  return response.data
}

// add new item
const addItem = async (newItem) => {
  const response = await axios.post(baseUrl, newItem, getAuthConfig())
  return response.data
}

// update item
const updateItem = async (id, updateData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updateData, getAuthConfig());
    console.log("Update response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete item
const deleteItem = async (id) => {

  const response = await axios.delete(`${baseUrl}/${id}`, getAuthConfig())
  return response.data
}

export default { getAllItems, getItemById, addItem, updateItem, deleteItem };
