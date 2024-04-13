import React from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange} from '@mui/material/colors';
import {useDispatch, useSelector} from'react-redux';
import { logout } from '../Redux/userSlice';
const Logo = "https://www.cloudhalotech.com/images/OG-image.jpg"
const Header = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {user} = useSelector(state =>state.halo)

  const handleLogout =()=>{
    dispatch(logout())
    navigate('/home')
  }
 
  
  return (
    <div className="topbar">
      <div className="topLeft">
        <img src={Logo} alt="logo" className='topIcon' />
      </div>
      <div className="topCenter">
        <ul className='topList'>
          <li className='topListItem'>
            <Link to='/home' className='link'>Home</Link>
          </li>
          <li className='topListItem'>
          <Link to='/todo' className='link'>My Todo</Link>
          </li>
          <li className='topListItem' onClick={handleLogout}>
          {(user !== null) && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          (user !== null) ? (
             <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.username?.slice(0,2).toUpperCase()}</Avatar>
          ):(
            <>
            <ul className='topList'>
              <li className='topListItem'>
                <Link className='link' to='/login'>Login</Link>
              </li>
              <li className='topListItem'>
                <Link className='link' to='/register'>Register</Link>
              </li>
            </ul>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Header