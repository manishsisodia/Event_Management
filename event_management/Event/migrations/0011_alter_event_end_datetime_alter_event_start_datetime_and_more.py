# Generated by Django 4.2.7 on 2024-06-11 09:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0010_alter_event_end_datetime_alter_event_start_datetime_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 11, 9, 58, 21, 810997, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 11, 9, 58, 21, 810979, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='feedback_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 11, 9, 58, 21, 814843, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='messages',
            name='message_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 11, 9, 58, 21, 814489, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='sessionmodel',
            name='end_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 11, 9, 58, 21, 815227, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='sessionmodel',
            name='start_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 11, 9, 58, 21, 815215, tzinfo=datetime.timezone.utc)),
        ),
    ]