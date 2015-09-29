from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin
from models import User, generate_demo_data
from django.core.mail import send_mail

import json


def index(request):
  return render(request, "index.html", {})


def siteIndex(request):
  return render(request, "site/index.html", {})


def siteFeatures(request):
  return render(request, "site/features.html", {})


def siteAbout(request):
  return render(request, "site/about.html", {})


def siteContact(request):
  email = request.POST.get('email')
  name = request.POST.get('name', '[no name]')
  message = request.POST.get('message', '[no message]')

  if email:
      send_mail('Feedback from "%s"' % name, message, email, ['contact@taskbird.ca'])

  return render(request, "site/contact.html", {})


def siteSignup(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if email and password:
            user = User.objects.create_user(username = email, email=email, password=password)
            user.save()
            user = authenticate(username=email, password=password)
            generate_demo_data(user)
            djangoLogin(request, user)
            return render(request, "app/index.html", {'user': user})
        else:
            return render(request, "site/signup.html", {'error_message': "You must enter a valid name, email, and password."})

    return render(request, "site/signup.html", {})


def login(request):
  if request.user.is_authenticated():
      return HttpResponseRedirect("/app/")
  username = request.POST.get('username')
  password = request.POST.get('password')
  user = authenticate(username=username, password=password)
  if user is not None:
    if user.is_active:
      djangoLogin(request, user)
      return HttpResponseRedirect("/app/")
    else:
      return HttpResponseRedirect("/")
  else:
    return render(request, "site/login.html", {})

@login_required
def appIndex(request):
  return render(request, "app/index.html", {'user': request.user})

