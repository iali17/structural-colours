# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-24 05:02
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20171123_2158'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='species',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.Species'),
            preserve_default=False,
        ),
    ]