# Generated by Django 4.2.7 on 2024-06-07 19:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0003_alter_event_end_datetime_alter_event_start_datetime_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 19, 50, 40, 175232, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 19, 50, 40, 175206, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='feedback_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 19, 50, 40, 181331, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='messages',
            name='message_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 19, 50, 40, 181018, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='sessionmodel',
            name='end_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 19, 50, 40, 181719, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='sessionmodel',
            name='start_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 19, 50, 40, 181704, tzinfo=datetime.timezone.utc)),
        ),
    ]
