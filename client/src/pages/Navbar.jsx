import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <>
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </>
  )
}

export default Navbar