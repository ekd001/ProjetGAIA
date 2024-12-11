/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Exportation.css';

const Exportation = () => {

  const handleDownload = () =>{
    window.open('http://192.168.137.1:8000/api/download_data/', '_blank');
  }
  return (
    <div className='container'>
        <h1>Exporter les données des capteurs</h1>
        <button type='button' onClick={handleDownload}>Télécharger</button>
    </div>
  )
}

export default Exportation;