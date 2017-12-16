from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin
from django.shortcuts import redirect
from .models import User, generate_demo_data
import taskbird.email

from .forms import ContactForm
from .forms import SignupForm

import json
import yaml
import os
from . import settings

def index(request):
    return render(request, "index.html", {})


def siteIndex(request):
    return render(request, "site/index.html", {})


def siteFeatures(request):
    file_path = os.path.join(settings.STATIC_ROOT, 'content/features.yaml')
    features = yaml.load(open(file_path, 'r'))
    #return JsonResponse({'1': features})
    return render(request, "site/features.html", {'features': features})


def siteAbout(request):
    #taskbird.email.send_password_reset_email('contact@taskbird.ca')
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


def siteSignup(request):
    return redirect('login')
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data.get('fist_name', '')
            last_name = form.cleaned_data.get('last_name', '')
            email = form.cleaned_data.get('email', '')
            password = form.cleaned_data.get('password', '')

            user = User.objects.create_user(
                first_name = first_name,
                last_name = last_name,
                username = email,
                email = email,
                password =password
            )
            user.save()
            user = authenticate(username=email, password=password)
            generate_demo_data(user)
            djangoLogin(request, user)
            return HttpResponseRedirect("/app/")
        else:
            return render(
                request,
                "site/signup.html",
                {'error_message': "You must enter a valid name, email, and password." + json.dumps(form.errors)}
            )

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

def request_password_reset(request):
    data = {}
    return render(request, "site/requestPasswordReset.html", data)

def password_reset(request):
    return JsonResponse({'a': 'a'})


@login_required
def appIndex(request):
    return render(request, "app/index.html", {'user': request.user})

