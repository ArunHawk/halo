import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import './sidebar.css';
import SideContainer from '../BarContainer/SideContainer';

const Sidebar = () => {
  return (
    <div className='mainContainer'>
        <div className="hederContainer" >
            <Header/>
        </div>
        <div className="details">
            <div className="left">
                <SideContainer/>
            </div>
            <div className="right">
            <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar