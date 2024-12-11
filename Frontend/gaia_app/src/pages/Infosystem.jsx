/* eslint-disable no-unused-vars */
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchInfoSys } from '../services/api/api';
import { useState, useEffect } from 'react';
import '../styles/infoSystem.css'

const Infosystem = () => {
   
    const [infosys, setInfosys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [etat, setEtat] = useState('Arrêter le système');
    const [message, setMessage] = useState(true);
    const [colorsys, setColorsys] = useState("rgb(0, 255, 0)");

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await fetchInfoSys();
        setInfosys(data);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, []);

  if (loading) return <h1 className='message'>Chargement...</h1>;
  if (error) return <h1 className='message'>{error}</h1>;
  const handleClick = () => {
    if(message){
      setEtat('Demarrer le système');
      setMessage(false);
      setColorsys("red");
    }else{
      setEtat('Arrêter le système');
      setMessage(true);
      setColorsys("rgb(0, 255, 0)");
    }
  }
    return (
    <div className='info'>
        <h1 className='title'>Information système</h1><br/>
        <span>Nom</span>                 : {infosys.name}<br/>
        <br/>
        <span>Version</span>             : {infosys.version}<br/>
        <br/>
        <span>Capteur du système</span>  : {infosys.sensor}<br/>
        <br/>
        <span>Realiser par</span>        : {infosys.director}<br/>
        <br/>
        <span>Avec support</span>        : {infosys.supports}<br/>
        <button type='button' style={{backgroundColor:colorsys, color:'white', marginTop:'50px', width:'200px', height:'40px', border:'none',
        borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}} onClick={handleClick}>{etat}</button>
    </div>
  )
}

export default Infosystem;