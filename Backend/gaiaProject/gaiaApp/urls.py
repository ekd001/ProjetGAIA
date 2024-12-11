from django.urls import path
from .views import SensorDataList, SensorDataCreate, SystemGet, WateringDataCreate, WateringDataList, downloadSensorData

urlpatterns = [
    path('SystemInfo/', SystemGet.as_view(), name="System-info"),
    path('SensorDataList/',SensorDataList.as_view(), name="SensorData-list"),
    path('SensorDataCreate/', SensorDataCreate.as_view(), name="SensorData-create"),
    path('WateringDataList/', WateringDataList.as_view(), name="WateringData-list"),
    path('WateringDataCreate/',WateringDataCreate.as_view(), name="WateringData-create"),
    path('download_data/', downloadSensorData, name='download_csv_data')
]