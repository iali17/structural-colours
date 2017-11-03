from rest_framework.serializers import (
    ModelSerializer,
    )

from api.models import *

class SpeciesDetailSerializer(ModelSerializer):
    class Meta(object):
        model = Species
        fields = '__all__'

class PictureSerializer(ModelSerializer):
    class Meta(object):
        model = Picture
        fields = '__all__'

class LandingPictureSerializer(ModelSerializer):
    class Meta(object):
        model = LandingPicture
        fields = '__all__'

class TaxonomySerializer(ModelSerializer):
    class Meta(object):
        model = Family
        depth = 3
        fields = '__all__'

class ColourSerializer(ModelSerializer):
    class Meta(object):
        model = Colour
        fields = '__all__'
