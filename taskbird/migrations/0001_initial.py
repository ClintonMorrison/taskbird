# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(default=b'Unnamed List', max_length=50)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('metadata', models.CharField(default=b'', max_length=1000, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OnList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dateAdded', models.DateTimeField(auto_now_add=True)),
                ('list', models.ForeignKey(to='taskbird.List')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(default=b'Unnamed Task', max_length=50)),
                ('description', models.CharField(default=b'', max_length=300, blank=True)),
                ('type', models.CharField(default=b'task', max_length=50)),
                ('done', models.BooleanField(default=False)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('dateModified', models.DateTimeField(auto_now=True)),
                ('dateDue', models.DateTimeField(null=True, blank=True)),
                ('metadata', models.CharField(default=b'', max_length=1000, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserSettings',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('notes', models.CharField(default=b'', max_length=1000, blank=True)),
                ('metadata', models.CharField(default=b'', max_length=1000, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='onlist',
            name='task',
            field=models.ForeignKey(to='taskbird.Task'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='onlist',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
