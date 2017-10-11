from rest_framework.serializers import (
    ModelSerializer,
    )

from api.models import *

class SpeciesDetailSerializer(ModelSerializer):
    class Meta(object):
        model = Species
        fields = '__all__'
