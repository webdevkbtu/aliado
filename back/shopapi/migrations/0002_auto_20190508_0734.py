# Generated by Django 2.2 on 2019-05-08 07:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shopapi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='userName',
        ),
        migrations.AddField(
            model_name='orders',
            name='userID',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]