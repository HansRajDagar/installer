from django.urls import path , include
from .router import router
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')


urlpatterns = [
    path('main', include(router.urls)),
    path('swagger', schema_view)

]