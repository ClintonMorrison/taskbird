"""
  Usage: python reportUserData.py <userID>
"""

import os
import sys

sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../'))
sys.path.insert(0, "/home1/clintor1/python/lib/python2.7/site-packages")
sys.path.append("/home1/clintor1/django_projects/taskbird")
os.environ["DJANGO_SETTINGS_MODULE"] = "taskbird.settings"

import django 
import taskbird.models as models
from django.contrib.auth.models import User

django.setup()

userID = None

if len(sys.argv) == 2:
  path, userID = sys.argv
  userID = int(userID)

print '=== USERS ==='

for user in User.objects.all():
  header = '     '
  if userID == user.id: header = ' >>> ' 
  print '%s%d: %s %s <%s>' % (header, user.id, user.first_name, user.last_name, user.email)

if userID:
  print '\n=== TASKS ==='
  for task in models.Task.objects.filter(user__id=userID):
    date = ''
    if task.date_due: date = '[@ %s]' % task.date_due
    print '>', task.title, date
    try:
      print task.description
      if task.description: print ''
    except:
      pass

#print models.Task.objects.all()

