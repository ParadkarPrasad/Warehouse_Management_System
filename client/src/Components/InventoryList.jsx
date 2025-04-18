import React, { useContext } from 'react'

// import itemApi to show all items
import itemApi from '../services/itemApi'

// to get the current user role
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // for navigation to update form
const InventoryList = ({ items, setItems, searchItem }) => {

  // Get current user login
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Delete Button 
  const handleDelete = async (id) => {
    try {
      await itemApi.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  // Edit button (functionality to be handled separately)
  const handleEdit = (itemId) => {
    navigate(`/update-items/${itemId}`) // Placeholder
  };

  // Filter Item based on search
  const filterItem = items.filter(item => (
    item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.category.toLowerCase().includes(searchItem.toLowerCase())
  ))




  return (
    <>

      <h2 className="text-xl font-semibold mb-2">Inventory List</h2>
      {filterItem.length === 0 ? (
        <p>No items in inventory.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Item Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Added On</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterItem.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="border p-2 space-x-2">
                  {(user.role === "admin" || user.role === "staff") && (
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                  )}
                  {user.role === "admin" && (
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default InventoryList

