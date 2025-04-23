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

      <h2 >Inventory List</h2>
      {filterItem.length === 0 ? (
        <p>No items in inventory.</p>
      ) : (
        <div >
          <table >
            <thead>
              <tr >
                <th >Item Name</th>
                <th >Item Description</th>
                <th >Quantity</th>
                <th >Category</th>
                <th >Added On</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterItem.map((item) => (
                <tr key={item.id}>
                  <td >{item.name}</td>
                  <td >{item.description}</td>
                  <td >{item.quantity}</td>
                  <td >{item.category}</td>
                  <td >{new Date(item.createdAt).toLocaleDateString()}</td>

                  <td >
                    <div className='btn-group'>
                      {(user.role === "admin" || user.role === "staff") && (
                        <button onClick={() => handleEdit(item.id)}>Edit</button>
                      )}
                      {user.role === "admin" && (
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default InventoryList

