from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    )

from .serializers import (
    SpeciesDetailSerializer,
    PictureSerializer,
    )
from .pagination import (
    PicturePageNumberPagination,
)
from api.models import *

class SpeciesDetailAPIView(RetrieveAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesDetailSerializer

class PictureListTemplateAPIView(ListAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    pagination_class = PicturePageNumberPagination
