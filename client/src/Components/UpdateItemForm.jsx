import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import itemApi from '../services/itemApi'
import { useSelector } from 'react-redux';
import Navbar from '../pages/Navbar';
const UpdateItemForm = () => {
  const [error, setError] = useState("");
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    quantity: "",
    category: "",
  })
  const user = useSelector((state) => state.auth.user)
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

      <div className='update_container' >
        <button className='back-btn' onClick={() => navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard")}>Back</button>
        <h2>Update Item</h2>
        <div className='update_layout' >
          <form className='update_item' onSubmit={handleSubmit}>
            <div className='update_label' >
              <label htmlFor="name">Name</label>
              <input
                className='update_input'
                type="text"
                id="name"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='update_label' >
              <label htmlFor="description">Description</label>
              <textarea
                className='update_input'
                id="description"
                name="description"
                value={itemData.description}
                onChange={handleChange}
              />
            </div>
            <div className='update_label' >
              <label htmlFor="quantity">Quantity</label>
              <input
                className='update_input'
                type="number"
                id="quantity"
                name="quantity"
                value={itemData.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className='update_label' >
              <label htmlFor="category">Category</label>
              <input
                className='update_input'
                type="text"
                id="category"
                name="category"
                value={itemData.category}
                onChange={handleChange}
                required
              />
            </div>
            <button className='update-btn' type='submit'>Update Item</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateItemForm