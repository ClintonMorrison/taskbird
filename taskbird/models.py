from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

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
    project = models.ForeignKey(Project, blank=True, default=None, null=True)

class SecurityToken(models.Model):
    user = models.ForeignKey(User)
    type = models.CharField(max_length=50, default="") #'task' or 'event'
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

class UserSettings(models.Model):
    user = models.OneToOneField(User)
    notes = models.CharField(max_length=1000, blank=True, default="")
    metadata = models.CharField(max_length=1000, blank=True, default="")


def generate_demo_data(user):
    sample_tasks = [
        ['Sample Task', 'This is a sample task'],
        ['Try Making a Project', '\n'.join([
            'Click "Projects" on the top menu. ',
            'Next, click the "New Project" button. ',
            'You can associate tasks with projects. '
        ])],
        ['Check out the Calendar Page', '\n'.join([
            'Click "Calendar" on the top menu. ',
            'Click a day to view the tasks due on that day. ',
            'You can add new tasks by clicking the "New Task" button. '
        ])],
        ['Check out the Analytics Page', '\n'.join([
            'Click "Analytics" on the top menu. ',
            'This page shows statistics and trends about your what you have been working on. ',
        ])],
    ]

    sample_projects = [
        ['Personal', 'yellow', 'star'],
        ['School', 'black', 'student'],
        ['Work', 'black', 'suitcase']

    ]

    for title, color, icon in sample_projects:
        project = Project(user=user, title=title, color=color, icon=icon)
        project.save()

    for title, description in sample_tasks:
        task = Task(user=user, title=title, description=description)
        task.save()

def user_created(sender, **kwargs):
    user = kwargs['instance']
    if kwargs['created']:
        generate_demo_data(user)

post_save.connect(user_created, sender=User)