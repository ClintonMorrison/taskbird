# -*- coding: utf-8 -*-


from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('taskbird', '0003_auto_20150821_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='date_completed',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
