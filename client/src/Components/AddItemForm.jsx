import React, { useState } from 'react';
import itemApi from '../services/itemApi';
import Navbar from '../pages/Navbar';

const AddItemForm = ({ onItemAdded }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    quantity: 0,
    category: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await itemApi.addItem(newItem);
      alert("New item added successfully")
      setNewItem({
        name: '',
        description: '',
        quantity: 0,
        category: ''
      })
      onItemAdded();
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <>

      <h3>Add New Item</h3>
      <form className='form_details' onSubmit={handleSubmit}>
        <input

          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleChange}
          required
        />
        <input

          type="text"
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleChange}
        />
        <input

          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleChange}
          required
        />
        <input

          type="text"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleChange}
          required
        />
        <button className='addItem_btn' type="submit">Add Item</button>
      </form>
    </>
  )
}

export default AddItemForm