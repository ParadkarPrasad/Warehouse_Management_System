import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <>
      <nav className='flex justify-end mt-2.5'>
        <button className='p-3' onClick={handleLogout}> <FontAwesomeIcon icon={faRightFromBracket} /></button>
      </nav>
    </>
  )
}

export default Navbar