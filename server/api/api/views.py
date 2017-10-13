from rest_framework.generics import (
    RetrieveAPIView,
    )

from .serializers import (
    SpeciesDetailSerializer,
    )
from api.models import *

class SpeciesDetailAPIView(RetrieveAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesDetailSerializer
