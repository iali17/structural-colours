from django.conf.urls import include, url

from .views import *

urlpatterns = [
    url(r'^$', index, name="root"),
    url(r'^api/', include("api.api.urls"), name="api")
]
