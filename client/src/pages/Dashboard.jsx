import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import InventoryList from '../Components/InventoryList'
import itemApi from '../services/itemApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const [searchItem, setSearchItem] = useState("")

  useEffect(() => {
    const fetchItems = async () => {
      const data = await itemApi.getAllItems()
      setItems(data)
    }
    fetchItems()
  }, [])
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
      <div >
        <div>
          <div>
            <h1 >Dashboard</h1>
            <p >Manage inventory and track supplies</p>
          </div>
        </div>
        <div>
          <input type='text' placeholder='Search inventory items' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <InventoryList items={items}
          setItems={setItems}
          searchItem={searchItem} />
      </div>
    </>
  )
}

export default Dashboard