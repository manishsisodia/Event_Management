# Generated by Django 4.2.7 on 2024-06-07 20:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0005_alter_event_end_datetime_alter_event_start_datetime_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='role',
        ),
        migrations.RemoveField(
            model_name='role',
            name='role_to_user',
        ),
        migrations.AlterField(
            model_name='event',
            name='end_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 20, 8, 54, 373846, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 20, 8, 54, 373826, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='feedback_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 20, 8, 54, 377229, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='messages',
            name='message_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 20, 8, 54, 376924, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='sessionmodel',
            name='end_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 20, 8, 54, 377607, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='sessionmodel',
            name='start_datetime',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 7, 20, 8, 54, 377596, tzinfo=datetime.timezone.utc)),
        ),
    ]