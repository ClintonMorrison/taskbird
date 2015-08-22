from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from taskbird import views

from taskbird.api import TaskResource, UserResource, UserSettingsResource

from models import Task
from models import User

task_resource = TaskResource()
user_resource = UserResource()
userSettings_resource = UserSettingsResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'taskbird.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/$', include(admin.site.urls)),
    # url(r'^$', views.index, name='index'),

    url(r'^$', views.siteIndex, name='siteIndex'),
    url(r'^features/$', views.siteFeatures, name='siteFeatures'),
    url(r'^about/$', views.siteAbout, name='siteAbout'),
    url(r'^contact/$', views.siteContact, name='siteContact'),
    url(r'^signup/$', views.siteSignup, name='siteSignup'),
    url(r'^login/$', views.login, name='login'),
    
    url(r'^app/$', views.appIndex, name='appIndex'),
    url(r'^api/', include(task_resource.urls)),
    url(r'^api/', include(user_resource.urls)),
    url(r'^api/', include(userSettings_resource.urls))
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

