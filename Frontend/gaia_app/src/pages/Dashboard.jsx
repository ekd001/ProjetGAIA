/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/Dashboard.css';
import SensorChart from '../components/SensorChart';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className='title'>Dashboard</h1>
      <div className='chart'>
        <SensorChart className="temperature-chart"/>
      </div>
    </div>
  )
}

export default Dashboard;