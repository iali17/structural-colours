from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^species/(?P<pk>[0-9]+)/$', SpeciesDetailAPIView.as_view(), name='species-detail'),
]
