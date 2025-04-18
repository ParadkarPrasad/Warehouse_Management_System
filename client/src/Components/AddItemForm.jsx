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
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Add New Item</h3>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border rounded-md"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleChange}
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" type="submit">Add Item</button>
        </form>
      </div>
    </>
  )
}

export default AddItemForm