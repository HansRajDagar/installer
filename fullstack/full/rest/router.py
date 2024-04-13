
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import PersonalDetailViewset, MovementViewset

router = routers.DefaultRouter()
router.register('personal', PersonalDetailViewset)
router.register('movement', MovementViewset)

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('/swagger', schema_view)
]