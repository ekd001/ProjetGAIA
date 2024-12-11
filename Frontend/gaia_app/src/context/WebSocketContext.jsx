/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({children}) => {
    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [timelabel, setTimeLabels] = useState([])

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8001/ws/sensordata/');

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
            
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ temperature, timelabel }}>
            {children}
        </WebSocketContext.Provider>
    );
}

WebSocketProvider.propTypes = {
    children : PropTypes.node.isRequired,
};

