from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin
import taskbird.email

from .forms import ContactForm

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
    data = {}

    if request.method == 'POST':
        form = ContactForm(request.POST)
        data['form'] = form
        if form.is_valid():
            taskbird.email.send_admin_email(
                'Feedback from "%s"' % form.cleaned_data.get('name', ''),
                form.cleaned_data.get('message', '')
            )

    return render(request, "site/contact.html", data)

def login(request):
    if request.user.is_authenticated:
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

def request_password_reset(request):
    data = {}
    return render(request, "site/requestPasswordReset.html", data)

def password_reset(request):
    return JsonResponse({'a': 'a'})


@login_required
def appIndex(request):
    return render(request, "app/index.html", {'user': request.user})

