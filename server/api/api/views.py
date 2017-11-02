import random
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    )

from .serializers import (
    SpeciesDetailSerializer,
    PictureSerializer,
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

        if colour_param is not None and species_param is not None:
            # TODO: This is where we will do the advanced search.
            queryset = Picture.objects.all().order_by('id')

        return queryset

class RandomPictureListAPIView(ListAPIView):
    serializer_class = PictureSerializer

    def get_queryset(self):
        count = Picture.objects.all().count()
        index = random.random() * (count - 4)
        queryset = Picture.objects.all()[index: index + 4]

        return queryset

class ColourListAPIView(ListAPIView):
    queryset = Colour.objects.all()
    serializer_class = ColourSerializer

class TaxonomyListAPIView(ListAPIView):
    queryset = Family.objects.all()
    serializer_class = TaxonomySerializer
