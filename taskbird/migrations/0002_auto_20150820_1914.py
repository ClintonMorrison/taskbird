# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('taskbird', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='onlist',
            name='list',
        ),
        migrations.RemoveField(
            model_name='onlist',
            name='task',
        ),
        migrations.RemoveField(
            model_name='onlist',
            name='user',
        ),
        migrations.RemoveField(
            model_name='list',
            name='metadata',
        ),
        migrations.RemoveField(
            model_name='task',
            name='metadata',
        ),
        migrations.AddField(
            model_name='task',
            name='lists',
            field=models.ManyToManyField(to='taskbird.List'),
        ),
        migrations.DeleteModel(
            name='OnList',
        ),
    ]
