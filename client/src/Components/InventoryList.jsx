import React, { useContext, useState } from 'react'

// import itemApi to show all items
import itemApi from '../services/itemApi'

// to get the current user role
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // for navigation to update form


// Pagination items
const ITEMS_PER_PAGE = 5;
const InventoryList = ({ items, setItems, searchItem }) => {

  // Get current user login
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(filterItem.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = filterItem.slice(startIndex, endIndex);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };



  return (

    <div className="inventory-wrapper">
      <h2 className="inventory-heading">Inventory List</h2>
      {paginatedItems.length === 0 ? (
        <p>No items in inventory.</p>
      ) : (
        <>
          <div className='inventory_section'>
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
                {paginatedItems.map((item) => (
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

          <div className="inventory-cards">
            {paginatedItems.map(item => (
              <div key={item.id} className="inventory-card">
                <h3>{item.name}</h3>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Added On:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                <div className="btn-group">
                  {(user.role === "admin" || user.role === "staff") && (
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                  )}
                  {user.role === "admin" && (
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  )
}

export default InventoryList

