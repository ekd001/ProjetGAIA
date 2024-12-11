from rest_framework import serializers
from .models import SensorData, System, WateringData

class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = '__all__'

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = '__all__'

class WateringDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WateringData
        fields = '__all__'