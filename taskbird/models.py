from django.db import models
from django.contrib.auth.models import User


class List(models.Model):
  user = models.ForeignKey(User)
  title = models.CharField(max_length=50, default="Unnamed List")
  date_created = models.DateTimeField(auto_now_add=True)


class Task(models.Model):
  user = models.ForeignKey(User)
  title = models.CharField(max_length=50, default="Unnamed Task")
  description = models.CharField(max_length=300, blank=True, default="")
  type = models.CharField(max_length=50, default="task") #'task' or 'event'
  done = models.BooleanField(default=False)
  date_created = models.DateTimeField(auto_now_add=True)
  date_completed = models.DateTimeField(null=True, blank=True)
  date_modified = models.DateTimeField(auto_now=True)
  date_due = models.DateTimeField(null=True, blank=True)
  lists = models.ManyToManyField(List)


class UserSettings(models.Model):
  user = models.ForeignKey(User)
  notes = models.CharField(max_length=1000, blank=True, default="")
  metadata = models.CharField(max_length=1000, blank=True, default="")
