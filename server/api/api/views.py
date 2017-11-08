import random
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    )

from .serializers import (
    SpeciesDetailSerializer,
    PictureSerializer,
    LandingPictureSerializer,
    TaxonomySerializer,
    ColourSerializer,
    )
from .pagination import (
    PicturePageNumberPagination,
)
from api.models import *

class SpeciesDetailAPIView(RetrieveAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesDetailSerializer

class PictureListAPIView(ListAPIView):
    serializer_class = PictureSerializer
    pagination_class = PicturePageNumberPagination

    def get_queryset(self):
        queryset = Picture.objects.all().order_by('id')
        colour_param = self.request.query_params.get('colour')
        species_param = self.request.query_params.get('species')

        # TODO: This is where we will do the advanced search.
        if colour_param is not None and species_param is not None:
            # One liner to get all the species from SpeciesColour using colour_param and species_param
            species_list = SpeciesColour.objects.filter(colour__colour=colour_param, species__common_name__icontains=species_param).values_list('species')

            # Set queryset with species_list list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')
        elif colour_param is not None:
            # Get all the species with colour = colour_param
            species_list = SpeciesColour.objects.filter(colour__colour=colour_param).values_list('species')

            ## Set queryset with species_list list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')
        elif species_param is not None:
            # Get all the species with colour = colour_param
            species_list = SpeciesColour.objects.filter(species__common_name__icontains=species_param).values_list('species')

            # Set queryset with species_list list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')

        return queryset

class RandomLandingPictureListAPIView(ListAPIView):
    serializer_class = LandingPictureSerializer

    def get_queryset(self):
        count = LandingPicture.objects.all().count()
        index = random.random() * (count - 4)
        queryset = LandingPicture.objects.all()[index: index + 4]

        return queryset

class ColourListAPIView(ListAPIView):
    queryset = Colour.objects.all()
    serializer_class = ColourSerializer

class TaxonomyListAPIView(ListAPIView):
    queryset = Family.objects.all()
    serializer_class = TaxonomySerializer
