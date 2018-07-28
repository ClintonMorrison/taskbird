from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

import yaml
import os
from . import settings

def index(request):
    return render(request, "index.html", {})

def siteIndex(request):
    return render(request, "site/index.html", {})

def siteFeatures(request):
    file_path = os.path.join(settings.BASE_STATIC_PATH, 'content/features.yaml')
    features = yaml.load(open(file_path, 'r'))
    return render(request, "site/features.html", {'features': features})

def siteAbout(request):
    return render(request, "site/about.html", {})

def siteContact(request):
    return render(request, "site/contact.html", {})

def login(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect("/v2/")

    return render(request, "site/login.html", {})

@login_required
def appIndex(request):
    return render(request, "app/index.html", {'user': request.user})

