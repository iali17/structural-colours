from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    )

from rest_framework import serializers

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
    family = SerializerMethodField()
    order = SerializerMethodField()
    speciesClass = SerializerMethodField()
    phylum = SerializerMethodField()
    kingdom = SerializerMethodField()
    class Meta(object):
        model = Species
        fields = ['speciesId', 'species', 'family', 'order', 'speciesClass', 'phylum', 'kingdom']
    def get_family(self,obj):
        return obj.family.family
    def get_order(self,obj):
        return obj.family.order.order
    def get_speciesClass(self,obj):
        return obj.family.order.speciesClass.speciesClass
    def get_phylum(self,obj):
        return obj.family.order.speciesClass.phylum.phylum
    def get_kingdom(self,obj):
        return obj.family.order.speciesClass.phylum.kingdom.kingdom

class AuthorSerializer(ModelSerializer):
    class Meta(object):
        model = Author
        fields = ['name']

class ArticleSerializer(ModelSerializer):
    author = AuthorSerializer(read_only=True, many=True)
    class Meta(object):

        model = Article
        fields = ['title', 'author', 'abstract', 'species', 'detail']
