import os
import json
from channels.generic.websocket import WebsocketConsumer , AsyncWebsocketConsumer
from asyncio import sleep
from channels.db import database_sync_to_async

@database_sync_to_async
def read_index():
    from .models import IndexGraph
    indexgraph = IndexGraph.objects.first()
    return indexgraph.index

@database_sync_to_async
def write_index(index):
    from .models import IndexGraph
    i = IndexGraph.objects.get(id=1)
    i.index = index
    i.save()

class SensorDataConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_sending = False 

    
    async def connect(self):
        await self.accept()
        self.start_index = await read_index() #index de depart pour connaître le nombre de paquet envoyer avant la deconnexion
        self.paquet_size = 1 #nombre de d'instance envoyées
        self.is_sending = True
        await self.sendData()

    async def disconnect(self, close_code):
        try:
            print("Déconnexion en cours...")
            self.is_sending = False
            print(f"Essai d'écriture de l'index : {self.start_index}")
            
            print(f"Index sauvegardé : {self.start_index}")
        except Exception as e:
            print(f"Erreur lors de la déconnexion : {e}")
         


    async def sendData(self):
        while self.is_sending:
            data = await self.getData(self.start_index, self.paquet_size)
            if not data:
                break
            await self.send(json.dumps(data))
            self.start_index += len(data)
            await sleep(5)
            await write_index(self.start_index)
    
    @database_sync_to_async
    def getData(self, start, limit):
        from .models import SensorData
        sensor_data = SensorData.objects.all()[start:start + limit]
        return [{
            "date": sensor_datum.date.strftime("%Y-%m-%d %H:%M:%S"),
            "humidity": sensor_datum.humidity,
            "temperature": sensor_datum.temperature,
            "numero":self.start_index
        } for sensor_datum in sensor_data]

    async def receive(self,text_data):
        data = json.loads(text_data)
        heure_definie = data["heure"]
        

    def calculTempsIrrigation():
        from .models import SensorData, WateringData
        import numpy as np
        sensor_data = SensorData.objects.all()
        hum_data = []
        temp_data = []
        for sensor_datum in sensor_data:
            hum_data.append(sensor_data.humidity)
            temp_data.append(sensor_datum.temperature)
        hum_mean = np.array(hum_data).mean()
        temp_mean = np.array(temp_data).mean()
        temp_irr = 0
        if(temp_mean > 25):
            temp_irr = 50
        return {
            "humidity_mean" : hum_mean,
            "temperature_mean" : temp_mean,
            "temps_irrigation" : temp_irr
        }

class DataConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()


    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Broadcast the received message to all clients
        self.send(text_data=json.dumps({
            'message': 'yoch'
        }))


