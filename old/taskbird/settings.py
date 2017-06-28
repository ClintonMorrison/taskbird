"""
Django settings for taskbird project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'n-v12v(5k4vmh@bo$+xp=4nws_j7vwss4c79-_07b+hiw+h6g3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ADMINS = (('TaskBird Admin', 'contact@taskbird.ca'),)
SERVER_EMAIL = 'contact@taskbird.ca'
#EMAIL_HOST='localhost'
#EMAIL_PORT=1025

PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))

# TEMPLATES
TEMPLATE_DEBUG = True

TEMPLATE_DIRS = (
    PROJECT_PATH + '/../templates/',
)

LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/login'

ALLOWED_HOSTS = ['taskbird.ca', 'wwww.taskbird.ca', '.taskbird.ca', '.clintonmorrison.com']

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tastypie',
    'social.apps.django_app.default',
    'taskbird'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'taskbird.urls'

WSGI_APPLICATION = 'taskbird.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'OPTIONS': {
          'autocommit': True
        }
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

PROJECT_DIR=os.path.dirname(__file__)
STATIC_URL = '/taskbird/static/'
#STATICFILES_DIRS = [os.path.join(PROJECT_DIR,'static')]
STATIC_ROOT = os.path.join(PROJECT_DIR,'static')

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ''
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ''

AUTHENTICATION_BACKENDS = (
    'social.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend'
)
