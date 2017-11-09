# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-09 22:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_landingpicture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='species',
            name='group',
        ),
        migrations.AlterField(
            model_name='kingdom',
            name='kingdom',
            field=models.CharField(choices=[('Eu', 'Eubacteria'), ('Ar', 'Archaebacteria'), ('Fu', 'Fungi'), ('Pl', 'Plantae'), ('In', 'Invertebrates'), ('Ve', 'Vertebrates')], max_length=2, primary_key=True, serialize=False),
        ),
    ]
