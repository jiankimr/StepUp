# Generated by Django 4.2.3 on 2023-07-30 22:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('mission', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserMission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed_at', models.DateField(default=django.utils.timezone.now)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='completedmission',
            name='mission',
        ),
        migrations.RemoveField(
            model_name='completedmission',
            name='user',
        ),
    ]
