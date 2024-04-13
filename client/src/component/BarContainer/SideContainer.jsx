import React, { useState } from 'react';
import './sidecontainer.css';
import MenuIcon from "@mui/icons-material/Menu";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { NavLink } from 'react-router-dom';
import { pink } from '@mui/material/colors';

const SideContainer = () => {
    const [isOpen,setIsOpen] = useState(true);
  const toggle =()=>{
    setIsOpen(!isOpen)
    console.log(!isOpen)
  }
  return (
    <div className='sidebarContainer'>
        <div className="top" style={{ width: isOpen ? "300px" : "50px" }}>
          <div className="menu" onClick={toggle}>
            <MenuIcon className="Menuicons" sx={{ color: pink[500] }}/>
          </div>
        </div>
        <hr />
        <div className="center">
          <ul>
            <NavLink to="/todo" className="link">
              <li>
                <NoteAltIcon className="icons" style={{fontSize:"40px"}} />
                {isOpen?(<span>Your To Do</span>) : null}
              </li>
            </NavLink>
          </ul>
        </div>
        <hr />
        {isOpen?(<div className="bottom">
          <div className="colorOptions"></div>
          <div className="colorOptions"></div>
        </div>): null}
    </div>
  )
}

export default SideContainer