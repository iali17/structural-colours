from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^species/(?P<pk>[0-9]+)/$', SpeciesDetailAPIView.as_view(), name='species-detail'),
    url(r'^pictures/all/$', PictureListAPIView.as_view(), name='pictures-all'),
    url(r'^pictures/species/(?P<id>[0-9]+)/$', PictureSpeciesDetailAPIView.as_view(), name='picture-species'),
    url(r'^pictures/random/$', RandomLandingPictureListAPIView.as_view(), name='pictures-random'),
    url(r'^taxonomy/all/$', TaxonomyListAPIView.as_view(), name='taxonomy-all'),
    url(r'^colour/all/$', ColourListAPIView.as_view(), name='coloury-all'),
    url(r'^taxonomy/kingdom/$', PhylumByKingdomListAPIView.as_view(), name='kingdom-all'),
    url(r'^taxonomy/phylum/$', OrderByPhylumListAPIView.as_view(), name='phylum-all'),
    url(r'^taxonomy/order/$', FamilyByOrderListAPIView.as_view(), name='order-all'),
    url(r'^taxonomy/family/$', SpeciesByFamilyListAPIView.as_view(), name='family-all'),
]
