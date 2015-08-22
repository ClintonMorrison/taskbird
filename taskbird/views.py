from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin
import json

def index(request):
  return render(request, "index.html", {})
#return HttpResponse("Rango says hello world!")

def siteIndex(request):
  return render(request, "site/index.html", {})

def siteFeatures(request):
  return render(request, "site/features.html", {})

def siteAbout(request):
  return render(request, "site/about.html", {})

def siteContact(request):
  return render(request, "site/contact.html", {})

def siteSignup(request):
  return render(request, "site/signup.html", {})

def login(request):
  username = request.POST.get('username');
  password = request.POST.get('password');
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

