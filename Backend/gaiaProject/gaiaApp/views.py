from django.shortcuts import render

# Create your views here.
import csv
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import SensorData, System, WateringData
from .serializers import SensorDataSerializer, SystemSerializer, WateringDataSerializer


class SystemGet(APIView):
    def get(self, request):
        system = System.objects.first()
        serializer = SystemSerializer(system)
        return Response(serializer.data, status=status.HTTP_200_OK)
class SensorDataList(APIView):
    def get(self, request):
        dataFactor = SensorData.objects.all()
        serializer = SensorDataSerializer(dataFactor, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SensorDataCreate(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SensorDataSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WateringDataCreate(APIView):
    def post(self, request):
        serializer = WateringDataSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WateringDataList(APIView):
    def get(self, request):
        wateringData = WateringData.objects.all()
        serializer = WateringDataSerializer(wateringData, many=True)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

def downloadSensorData(request):
    #creer une reponse http de type csv
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="sensor_datas.csv"'

    writer = csv.writer(response)
    writer.writerow(['date', 'humidite','temperature'])

    for sensor_datum in SensorData.objects.all():
        writer.writerow([sensor_datum.date, sensor_datum.humidity, sensor_datum.temperature])
    
    return response
