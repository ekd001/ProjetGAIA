class WebSocketSensorData{
    static URL = "ws://127.0.0.1:8001/ws/sensordata/";

    constructor(setData){
        this.socket = new WebSocket(WebSocketSensorData.URL);
        this.setData = setData;
        this.data = {
            labels:[],
            datasets: [
                {label : 'Humidity', data:[]},
                {label : 'temperature', data:[]}
            ]
        }
        this.initialize();
    };



    initialize() {
        this.socket.onopen = () =>{
            console.log('WebSocket connection established');
        };

        this.socket.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            this.handleData(receivedData);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.socket.onerror = (error) => {
            console.log('WebSocket error: ', error);
        };
    }

    handleData(receivedData){
        const timestamps = this.data.labels;
        const humidityData = this.data.datasets[0].data;
        const temperatureData = this.data.datasets[1].data;

        // Ajoutez les nouvelles données
        receivedData.forEach(sensorDatum => {
            const time = new Date(sensorDatum.date).toLocaleTimeString();
            timestamps.push(time); // Ajoute la date au label
            humidityData.push(sensorDatum.humidity);
            temperatureData.push(sensorDatum.temperature);
        });

        this.setData({
            labels: [...timestamps],
            datasets: [
                { ...this.data.datasets[0], data: [...humidityData] },
                { ...this.data.datasets[1], data: [...temperatureData] }
            ]
        });
    }

    close() {
        this.socket.close();
    }

}

export default WebSocketSensorData;