import React, { useState } from 'react'
import { Link } from 'react-router-dom'
/* import logo from '../Images/logo.png' */
/* import { Icon } from 'react-icons-kit' */
/* import { shoppingCart } from 'react-icons-kit/feather/shoppingCart' */
/* import { auth } from '../firebase' */
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Navbar = ({ user }) => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  /* kt có login chưa */
  async function handleLogout() {
    setError("")
    try {
      await logout().then(() => {
        navigate("/")
        window.location.reload(false);
      })
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div className='navbar'>
      <div className='leftside'>
        <div className='logo'>
          {/* <img src={logo} alt="logo" /> */}
        </div>
      </div>
      <div className='rightside'>

        {!user && <>
          <div><Link className='navlink' to="/signup">SIGN UP</Link></div>
          <div><Link className='navlink' to="/login">LOGIN</Link></div>
        </>}

        {user && <>
          <div><Link className='navlink' to="/user">{user}</Link></div>
          <div className='cart-menu-btn'>
            <Link className='navlink' to="/cart">
              {/* <Icon icon={shoppingCart} size={20} /> */}
            </Link>
            {/* <span className='cart-indicator'>{totalQty}</span> */}
          </div>
          <div className='btn btn-danger btn-md'
            onClick={handleLogout}>LOGOUT</div>
        </>}

      </div>
    </div>

  )
}