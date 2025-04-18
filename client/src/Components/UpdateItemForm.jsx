import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import itemApi from '../services/itemApi'
import { AuthContext } from '../context/AuthContext';
import Navbar from '../pages/Navbar';
const UpdateItemForm = () => {
  const [error, setError] = useState("");
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    quantity: "",
    category: "",
  })
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the item data when component mounts
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await itemApi.getItemById(id);
        setItemData(response);
      } catch (error) {
        setError("Failed to fetch item data");
      }
    }
    fetchItemData();
  }, [id])

  // Handle form input changes
  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value })
  }

  // Handle form submission to update the item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updatedData = user.role === "staff"
      ? { quantity: itemData.quantity }  // Staff can only update quantity
      : itemData;


    try {
      await itemApi.updateItem(id, updatedData);
      alert("Item updated successfully");
      navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You do not have permission to update fields other than quantity.");
      } else {
        alert(error.response?.data?.message || "Something went wrong");
      }
    }



  }
  return (
    <>
      <Navbar />
      <div className=" pt-10">
        <h2 className='text-center'>Update Item</h2>
        <div className='flex justify-center w-full px-4'>
          <form className="flex flex-col items-start mt-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <label className='block mb-1 font-medium' htmlFor="name">Name</label>
              <input
                className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-50 placeholder:text-gray-500 placeholder:italic"
                type="text"
                id="name"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full mb-4">
              <label className='block mb-1 font-medium' htmlFor="description">Description</label>
              <textarea
                className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-50 placeholder:text-gray-500 placeholder:italic"
                id="description"
                name="description"
                value={itemData.description}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              <label className='block mb-1 font-medium' htmlFor="quantity">Quantity</label>
              <input
                className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-50 placeholder:text-gray-500 placeholder:italic"
                type="number"
                id="quantity"
                name="quantity"
                value={itemData.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="w-full mb-4">
              <label className='block mb-1 font-medium' htmlFor="category">Category</label>
              <input
                className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-50 placeholder:text-gray-500 placeholder:italic"
                type="text"
                id="category"
                name="category"
                value={itemData.category}
                onChange={handleChange}
                required
              />
            </div>
            <button className="w-full p-2 mt-2 bg-black text-white font-semibold rounded-md transition cursor-pointer" type='submit'>Update Item</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateItemForm