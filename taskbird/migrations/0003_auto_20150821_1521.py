# -*- coding: utf-8 -*-


from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('taskbird', '0002_auto_20150820_1914'),
    ]

    operations = [
        migrations.RenameField(
            model_name='list',
            old_name='dateCreated',
            new_name='date_created',
        ),
        migrations.RenameField(
            model_name='task',
            old_name='dateCreated',
            new_name='date_created',
        ),
        migrations.RenameField(
            model_name='task',
            old_name='dateDue',
            new_name='date_due',
        ),
        migrations.RenameField(
            model_name='task',
            old_name='dateModified',
            new_name='date_modified',
        ),
    ]
