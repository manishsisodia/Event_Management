# Generated by Django 4.2.7 on 2024-06-13 12:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='access_attempts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_attempt_time', models.DateTimeField(blank=True, null=True)),
                ('attempt_time', models.DateTimeField(blank=True, null=True)),
                ('login_time', models.DateTimeField(blank=True, null=True)),
                ('logout_time', models.DateTimeField(blank=True, null=True)),
                ('failed_login', models.IntegerField(default=0)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Access_Attempt',
                'verbose_name_plural': 'Access_Attempts',
                'db_table': 'Access_Attempts',
            },
        ),
    ]
