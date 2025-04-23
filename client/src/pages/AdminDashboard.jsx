import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import InventoryList from '../Components/InventoryList'
import AddItemForm from '../Components/AddItemForm'
import itemApi from '../services/itemApi'
import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);
  // Search bar states
  const [inputValue, setInputValue] = useState("")
  const [searchItem, setSearchItem] = useState("")
  const fetchItems = async () => {
    try {
      const data = await itemApi.getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle Search
  const handleSearch = () => {
    setSearchItem(inputValue);
    // setInputValue("");
  }

  // User press Enter or search button
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();

    }
  }
  return (
    <>
      <div >
        <Navbar />
      </div>
      <div className='dashboard-header'>
        <div className='dashboard-title'>
          <h2 >Admin Dashboard</h2>
          <p >Welcome! Manage users, view reports and change settings</p>
        </div>
        <div className='dashboard-search' >
          <input type='text' placeholder='Search Inventory Item' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {searchItem && (
            <button onClick={() => {
              setSearchItem("");
              setInputValue(""); // Reset the input value too
            }}>
              Clear
            </button>
          )}
        </div>
      </div>
      <div className='dashboard-content'>
        <div className='addForm'>
          {user.role === "admin" && (
            <div className='form_layout'>
              <AddItemForm onItemAdded={fetchItems} />
            </div>
          )}
        </div>
        <div className='inventory_section'>
          {user.role === "admin" && (
            <InventoryList
              items={items}
              setItems={setItems}
              searchItem={searchItem}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default AdminDashboard