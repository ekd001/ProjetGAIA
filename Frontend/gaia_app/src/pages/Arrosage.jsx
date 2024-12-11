/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../styles/Arrosage.css';

const Arrosage = () => {
  const [heure, setHeure] = useState('');
  const handleTimeChange = (event) => {
    setHeure(event.target.value);
  }

  return (
    
    <div className='container-a'>
      <h2>Définir heure pour le processus analyse et prise de decision</h2>
      <div className='heure'>
      
      <input
        id='time-input'
        type="time"
        value={heure}
        onChange={handleTimeChange} // Gestion de l'événement de changement
        />
        <p>Heure definie : <span>{heure}</span></p>
      </div>
      <div className='data-hum'>
        <h3>Humidité moyenne</h3>
        <p>77 %</p>
      </div>
      <div className='data-temp'>
        <h3>Temperature moyenne</h3>
        <p>28 °C</p>
      </div>
      <div className='data-irr'>
        <h3>Temps d&apos;irrigation</h3>
        <p>20 minutes</p>
        <div className='button-list'>
          <button type='button' className='button button-open'>Lancement d&apos;irrigation...</button>
          <button type='button' className='button button-stop'>Arrêt d&apos;irrigation</button>
        </div>
        
      </div>
    </div>
  )
}

export default Arrosage