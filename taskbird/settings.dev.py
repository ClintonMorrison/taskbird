import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'n-v12v(5k4vmh@bo$+xp=4nws_j7vwss4c79-_07b+hiw+h6g3'
DEBUG = True
ADMINS = (('TaskBird Admin', 'contact@taskbird.ca'),)
SERVER_EMAIL = 'contact@taskbird.ca'
PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))
TEMPLATE_DEBUG = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/login'
ALLOWED_HOSTS = ['127.0.0.1', 'taskbird.ca', 'wwww.taskbird.ca', '.taskbird.ca', '.clintonmorrison.com']
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tastypie',
    'social_django',
    'taskbird.apps.TaskbirdConfig'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)
ROOT_URLCONF = 'taskbird.urls'
WSGI_APPLICATION = 'taskbird.wsgi.application'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'clintor1_taskbird',
        'USER': 'root',
        'PASSWORD': '',
        'OPTIONS': {
          'autocommit': True
        }
    }
}
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
PROJECT_DIR=os.path.dirname(__file__)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = ''
BASE_STATIC_PATH = os.path.join(BASE_DIR, "static")
#STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = [
    BASE_STATIC_PATH,
]

SOCIAL_AUTH_URL_NAMESPACE = 'social'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '262580710536-jjsrja4992n5n5o4jiq2atb0p8qlrve1'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'K8GzypN4kF7Gtlu46Y2ipgzR'
AUTHENTICATION_BACKENDS = (
    'social_core.backends.open_id.OpenIdAuth',
    'social_core.backends.google.GoogleOpenId',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.google.GoogleOAuth',
    'social_core.backends.twitter.TwitterOAuth',
    'social_core.backends.yahoo.YahooOpenId',
    'django.contrib.auth.backends.ModelBackend'
)