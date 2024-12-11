/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';


const Sidebar = () => {
  return (
    <div className='menu'>
        <div className='logo'>
            <h2>SIS</h2>
        </div>

        <div className='line'></div>

        <div className='menu-list'>
            <Link to="/" className='menu-item'>
                <p>Dashboard</p>
            </Link>

            <Link to="/irrigation" className='menu-item'>
                <p>Irrigation</p>
            </Link>

            <Link to="/infosystem" className='menu-item'>
                <p>Info système</p>
            </Link>

            <Link to="/exportation" className='menu-item'>
                <p>Exporter</p>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar