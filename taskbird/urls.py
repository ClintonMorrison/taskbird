from taskbird import views
from django.conf.urls import url, include

from social.apps.django_app import urls as social_urls

from django.contrib.auth.views import logout

from taskbird.api import TaskResource, UserResource, UserSettingsResource, ProjectResource

from tastypie.api import Api

v1_api = Api(api_name='v1')
v1_api.register(TaskResource())
v1_api.register(UserResource())
v1_api.register(UserSettingsResource())
v1_api.register(ProjectResource())


urlpatterns = [
    url('^', include(social_urls, namespace="social")),
    url('^$', views.siteIndex, name='siteIndex'),
    url('^features/$', views.siteFeatures, name='siteFeatures'),
    url('^about/$', views.siteAbout, name='siteAbout'),
    url('^contact/$', views.siteContact, name='siteContact'),
    url('^login/$', views.login, name='login'),
    url('^logout/$', logout, name='logout'),
    url('^app/$', views.appIndex, name='appIndex'),
    url('^api/', include(v1_api.urls))
]

