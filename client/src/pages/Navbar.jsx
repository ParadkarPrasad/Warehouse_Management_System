import { logout } from '../reducers/authReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <>
      <nav className='navbar_container'>
        <p>Welcome, {user?.name}</p>
        <button className='logout' onClick={handleLogout}> <FontAwesomeIcon icon={faRightFromBracket} /></button>
      </nav>
    </>
  )
}

export default Navbar