from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
  user = models.ForeignKey(User)
  title = models.CharField(max_length=50, default="New Project")
  icon = models.CharField(max_length=50, default="cube")
  color = models.CharField(max_length=50, default="black")
  description = models.CharField(max_length=300, blank=True, default="")
  date_created = models.DateTimeField(auto_now_add=True)


class Task(models.Model):
  user = models.ForeignKey(User)
  title = models.CharField(max_length=50, default="New Task")
  description = models.CharField(max_length=300, blank=True, default="")
  type = models.CharField(max_length=50, default="task") #'task' or 'event'
  done = models.BooleanField(default=False)
  date_created = models.DateTimeField(auto_now_add=True)
  date_completed = models.DateTimeField(null=True, blank=True)
  date_modified = models.DateTimeField(auto_now=True)
  date_due = models.DateTimeField(null=True, blank=True)
  priority = models.CharField(max_length=10, default="Normal", choices = (
    ('Low', 'Low'),
    ('Normal', 'Normal'),
    ('High', 'High')
  ))
  projects = models.ManyToManyField(Project, blank=True)


class UserSettings(models.Model):
  user = models.OneToOneField(User)
  notes = models.CharField(max_length=1000, blank=True, default="")
  metadata = models.CharField(max_length=1000, blank=True, default="")
