from django.conf.urls.static import static
import taskbird.settings
from taskbird import views
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from social.apps.django_app import urls as social_urls

from django.contrib.auth.views import logout

from taskbird.api import TaskResource, UserResource, UserSettingsResource, ProjectResource

task_resource = TaskResource()
user_resource = UserResource()
userSettings_resource = UserSettingsResource()
project_resource = ProjectResource()

urlpatterns = [
    path('', include(social_urls, namespace="social")),
    path('', views.siteIndex, name='siteIndex'),
    path('features', views.siteFeatures, name='siteFeatures'),
    path('about', views.siteAbout, name='siteAbout'),
    path('contact', views.siteContact, name='siteContact'),
    path('login', views.login, name='login'),
    path('logout', logout, name='logout'),
    path('app/', views.appIndex, name='appIndex'),
    #path('api', include(TaskResource.urls)),
    #path('api', include(UserResource.urls)),
    #path('api', include(UserSettingsResource.urls)),
    #path('api', include(ProjectResource.urls)),
]# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

