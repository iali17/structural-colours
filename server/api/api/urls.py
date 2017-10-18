from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^species/(?P<pk>[0-9]+)/$', SpeciesDetailAPIView.as_view(), name='species-detail'),
    url(r'^pictures/all/$', PictureListTemplateAPIView.as_view(), name='pictures-all'),
    url(r'^taxonomy/all/$', TaxonomyListTemplateAPIView.as_view(), name='taxonomy-all'),
    url(r'^colour/all/$', ColourListAPIView.as_view(), name='coloury-all'),
]
