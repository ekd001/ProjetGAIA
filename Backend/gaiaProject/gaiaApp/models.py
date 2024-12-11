from django.db import models


# Create your models here.

class System(models.Model):
    code = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=150)
    version = models.CharField(max_length=20)
    sensor = models.CharField(max_length=50)
    director = models.CharField(max_length=50)
    supports = models.CharField(max_length=150)


class SensorData(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    humidity = models.FloatField(max_length=4)
    temperature = models.FloatField(max_length=4)
   


class WateringData(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    meanHumidity = models.FloatField(max_length=4)
    meanTemperature = models.FloatField(max_length=4)
    wateringTime = models.IntegerField()
    

class IndexGraph(models.Model):
    index = models.IntegerField()
