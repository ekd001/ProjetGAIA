from django.urls import path
from .consumers import DataConsumer , SensorDataConsumer

websocket_urlpatterns = [
    path("ws/sensordata/", SensorDataConsumer.as_asgi()),
    path("ws/data/", DataConsumer.as_asgi()),
]