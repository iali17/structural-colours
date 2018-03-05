from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^species/(?P<pk>[0-9]+)/$', SpeciesDetailAPIView.as_view(), name='species-detail'),
    url(r'^pictures/all/$', PictureListAPIView.as_view(), name='pictures-all'),
    url(r'^pictures/species/(?P<id>[0-9]+)/$', PictureSpeciesDetailAPIView.as_view(), name='picture-species'),
    url(r'^pictures/random/$', RandomLandingPictureListAPIView.as_view(), name='pictures-random'),
    url(r'^taxonomy/all/$', TaxonomyListAPIView.as_view(), name='taxonomy-all'),
    url(r'^articles/all/$', ArticleBySpeciesAndAuthorListAPIView.as_view(), name='articles-all'),
]
