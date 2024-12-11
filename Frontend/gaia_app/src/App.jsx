/* eslint-disable no-unused-vars */

import React from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Arrosage from "./pages/Arrosage";
import Infosystem from "./pages/Infosystem";
import './App.css';
import { WebSocketProvider } from "./context/WebSocketContext";
import Exportation from "./pages/Exportation";

const App = () => {
  return (
    <WebSocketProvider>
      <Router>
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard-content">
            <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/irrigation" element={<Arrosage />}/>
              <Route path="/infosystem" element={<Infosystem />}/>
              <Route path="/exportation" element={<Exportation />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </WebSocketProvider>
  )
}

export default App;

