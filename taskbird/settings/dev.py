from .base import *


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

DEBUG = True

ALLOWED_HOSTS += ['taskbird-clintonmorrison.c9users.io']

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]