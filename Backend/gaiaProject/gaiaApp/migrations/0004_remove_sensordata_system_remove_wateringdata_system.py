# Generated by Django 5.1.1 on 2024-09-27 04:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gaiaApp', '0003_indexgraph'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sensordata',
            name='system',
        ),
        migrations.RemoveField(
            model_name='wateringdata',
            name='system',
        ),
    ]
