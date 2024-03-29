__author__ = 'Clinton Morrison'

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from taskbird.models import Task, User, UserSettings, Project
from tastypie.exceptions import Unauthorized
from tastypie import fields


class BaseAuthentication(Authentication):
    def is_authenticated(self, request, **kwargs):
        return request.user.is_authenticated


class UserAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list.filter(pk=bundle.request.user.id)

    def read_detail(self, object_list, bundle):
        return bundle.obj == bundle.request.user

    def create_list(self, object_list, bundle):
        raise Unauthorized

    def create_detail(self, object_list, bundle):
        raise Unauthorized

    def update_list(self, object_list, bundle):
        allowed = []

        for obj in object_list:
            if obj == bundle.request.user:
                allowed.append(obj)

        return allowed

    def update_detail(self, object_list, bundle):
        return bundle.obj == bundle.request.user

    def delete_list(self, object_list, bundle):
        raise Unauthorized

    def delete_detail(self, object_list, bundle):
        raise Unauthorized


class OwnerOnlyAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list.filter(user=bundle.request.user)

    def read_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def create_list(self, object_list, bundle):
        return object_list

    def create_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def update_list(self, object_list, bundle):
        allowed = []

        for obj in object_list:
            if obj.user == bundle.request.user:
                allowed.append(obj)

        return allowed

    def update_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def delete_list(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def delete_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user


class ProjectResource(ModelResource):
    class Meta:
        always_return_data=True
        queryset = Project.objects.all()
        resource_name = 'project'
        authorization = OwnerOnlyAuthorization()
        authentication = BaseAuthentication()

    def hydrate(self, bundle, request=None):
        bundle.obj.user = bundle.request.user
        if not hasattr(bundle.obj, 'project'):
            bundle.obj.project = None

        return bundle


class TaskResource(ModelResource):
    project = fields.ToOneField(ProjectResource, 'project', full=True, null=True)

    class Meta:
        always_return_data=True
        queryset = Task.objects.all()
        resource_name = 'task'
        authorization = OwnerOnlyAuthorization()
        authentication = BaseAuthentication()
        limit = 0
        max_limit = 0

    def hydrate(self, bundle, request=None):
        bundle.obj.user = bundle.request.user
        return bundle

    def dehydrate(self, bundle):
        bundle.data['extra'] = 'hi'
        return bundle


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['is_active', 'password', 'is_superuser', 'is_staff', 'is_active']
        allowed_methods = ['get', 'put']
        authorization = UserAuthorization()
        authentication = BaseAuthentication()


class UserSettingsResource(ModelResource):
    class Meta:
        queryset = UserSettings.objects.all()
        resource_name = 'userSettings'
        authorization = OwnerOnlyAuthorization()
        authentication = BaseAuthentication()

    def hydrate(self, bundle, request=None):
        bundle.obj.user = bundle.request.user
        return bundle
