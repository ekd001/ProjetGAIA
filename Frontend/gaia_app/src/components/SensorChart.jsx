/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import WebSocketSensorData from '../services/websoket/SensorData.js';
import '../styles/Chart.css';
import { WebSocketProvider } from '../context/WebSocketContext.jsx';

// Enregistrer les composants Chart.js
Chart.register(...registerables);


  /*const TemperatureChart = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [humiditeData, setHumiditeData] = useState([]);
    const [timestamps, setTimestamps] = useState([]);
  
    useEffect(() => {
      // Fonction pour simuler la récupération des données en temps réel
      const fetchTemperature = () => {
        // Simuler une nouvelle température (par exemple entre 20°C et 30°C)
        const newTemperature = (Math.random() * 10 + 20).toFixed(2);
        const newTimestamp = new Date().toLocaleTimeString();
  
        // Mettre à jour les données de température et le temps
        setTemperatureData((prevData) => [...prevData.slice(-9), newTemperature]);
        setTimestamps((prevTimes) => [...prevTimes.slice(-9), newTimestamp]);
      };

      const fetchHumidite = () => {
        // Simuler une nouvelle température (par exemple entre 20°C et 30°C)
        const newHumidite = (Math.random() * 10 + 25).toFixed(2);
        const newTimestamp = new Date().toLocaleTimeString();
  
        // Mettre à jour les données de température et le temps
        setHumiditeData((prevData) => [...prevData.slice(-9), newHumidite]);
        setTimestamps((prevTimes) => [...prevTimes.slice(-9), newTimestamp]);
      };
  
      // Intervalle pour récupérer les nouvelles températures toutes les secondes
      const interval = setInterval(fetchTemperature, 5000);
      const interval1 = setInterval(fetchHumidite, 5000);
      return () => {clearInterval(interval); clearInterval(interval1)}; // Nettoyage à la fin
    }, []);

  // Données pour le graphique
  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Humidite (%)',
        data: humiditeData,
        fill: false,
        backgroundColor: 'rgba(75,0,192,1)',
        borderColor: 'rgba(75,0,192,1)',
        tension: 0.2,
      },
      {
        label: 'Température (°C)',
        data: temperatureData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.2,
      },
    ],
  };

  // Options du graphique
  const options = {
    scales: {
      x: {
        type: 'category',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: false,
        min: 15, // Plage minimum pour l'axe des Y
        max: 100, // Plage maximum pour l'axe des Y
      },
    },
  };

  return (
    <div className='temperature-chart'>
      <h4>Graphique des températures et humidités en temps réel</h4>
      <Line data={data} options={options} />
    </div>
  );
};*/

/*const SensorChart = () => {

  const[chartData, setChartData] = useState({
    labels : [],
    datasets : [
      { label: 'Humidity', data: [], borderColor: 'rgba(10,255,129,1)',backgroundColor: 'rgba(10,255,129,1)', fill: false, tension:0.2},
      { label: 'Temperature', data: [], borderColor: 'rgba(179,9,9,1)',backgroundColor: 'rgba(179,9,9,1)', fill: false, tension:0.2 },
    ]
  });

  useEffect(() => {
      const wsService = new WebSocketSensorData(setChartData);
      return () => {
        wsService.close();
      };
  }, []);

  const chartOptions = {
      scales: {
        x: {
            type: 'time',
            ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            }, // Assurez-vous que le type est 'time'
            time: {
                unit: 'minute', // Vous pouvez choisir l'unité souhaitée (minute, hour, etc.)
                tooltipFormat: 'HH:mm:ss', // Format lors du survol de la souris
                displayFormats: {
                    minute: 'HH:mm', // Format d'affichage sur l'axe
                },
            },
            title: {
                display: true,
                text: 'Temps', // Titre de l'axe des x
            },
        },
        y: {
            title: {
                display: true,
                text: 'Données', // Titre de l'axe des y
            },
            beginAtZero: false,
            min: 15, // Plage minimum pour l'axe des Y
            max: 100, // Plage maximum pour l'axe des Y
        },
    },
  }

  return(
    <div className='temperature-chart'>
      <h4>Graphique des températures et humidités en temps réel</h4>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
  ws://127.0.0.1:8001/ws/sensordata/
}*/


const SensorChart = () => {
    
    const [temperature, setTemperature] = useState([]);
    const [statictemp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState([]);
    const [statichum, setHum] = useState(0);
    const [timelabel, setTimeLabels] = useState([])

    useEffect(() => {
        const socket = new WebSocket('ws://192.168.137.1:8001/ws/sensordata/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("vent", data);

            const newhumitiy = data[0]["humidity"];
            const newtemp = data[0]["temperature"];
            const time = data[0]["date"];

            setHumidity(prevData => [...prevData, newhumitiy]);
            setTemperature(prevData => [...prevData, newtemp]);
            setTimeLabels(prevLabels => [...prevLabels, time]);
            setTemp(data[0]["temperature"]);
            setHum(data[0]["humidity"]);
            
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    
 
    const chartOptions = {
      
        scales: {
          x: {
            type: 'category',
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            beginAtZero: false,
            min: 15, // Plage minimum pour l'axe des Y
            max: 100, // Plage maximum pour l'axe des Y
          },
        },
    
  }

    const chartData = {
        labels: timelabel,
        
        datasets: [
            {
                label: 'Humidité',
                data:humidity,
                fill: false,
                backgroundColor: 'rgb(10,255,129)',
                borderColor: 'rgb(10,255,129)',
                tension: 0.2,  // Lissage de la courbe
            },
            {
              label: 'Température',
              data: temperature,
              fill: false,
              backgroundColor: 'rgb(179,9,9)',
              borderColor: 'rgb(179,9,9)',
              tension: 0.2,  // Lissage de la courbe
          },
        ],
    }

    return (
      <div className='temperature-chart'>
        <div className='chart'>
          <h4>Humidité et température en temps réel</h4>
          <Line data={chartData} options={chartOptions}/>
          
        </div>
        <div className='table'>
          <div className='table-item'>
            <h3>Humidité</h3>
            <p>{statichum} %</p>
          </div>
          <div className='table-item'>
            <h3>Temperature</h3>
            <p>{statictemp} °C</p>
          </div>
        </div>
      </div>  
    );
};




export default SensorChart;


