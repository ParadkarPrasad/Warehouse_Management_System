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
    setInputValue("");
  }

  // User press Enter or search button
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();

    }
  }
  return (
    <>
      <Navbar />
      <div className='p-4'>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className='px-2 mt-2.5 text-2xl font-bold'>Admin Dashboard</h2>
            <p className='px-2 text-blue-700 font-medium py-2'>Welcome! Manage users, view reports and change settings</p>
          </div>
          <div className="flex items-center gap-2">
            <input className="border px-2 py-1" type='text' placeholder='Search Inventory Item' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div>
          {user.role === "admin" && (
            <div className="w-1/3">
              <AddItemForm onItemAdded={fetchItems} />
            </div>
          )}
          <div className={user.role === "admin" ? "w-2/3" : "w-full"}>
            <InventoryList
              items={items}
              setItems={setItems}
              searchItem={searchItem}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard