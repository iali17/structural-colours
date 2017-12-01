import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    )
from .serializers import (
    SpeciesDetailSerializer,
    PictureSerializer,
    LandingPictureSerializer,
    TaxonomySerializer,
    ArticleSerializer,
    )
from .pagination import (
    PicturePageNumberPagination,
)
from api.models import *

class SpeciesDetailAPIView(RetrieveAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesDetailSerializer

class PictureSpeciesDetailAPIView(APIView):
    def get(self, request, id):
        try:
            picture = Picture.objects.filter(species=id).first()
            if picture:
                serializer = PictureSerializer(picture)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class PictureListAPIView(ListAPIView):
    serializer_class = PictureSerializer
    pagination_class = PicturePageNumberPagination

    def get_queryset(self):
        queryset = Picture.objects.all().order_by('id')
        colour_param = self.request.query_params.get('colour')
        species_param = self.request.query_params.get('species')

        if colour_param is not None and species_param is not None:
            # One liner to get all the species from SpeciesColour using colour_param and species_param
            species_list = Species.objects.filter(colour__icontains=colour_param, common_name__icontains=species_param).values_list('speciesId')
            # Set queryset with species_list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')
        elif colour_param is not None:
            # Get all the species with colour = colour_param
            species_list = Species.objects.filter(colour__icontains=colour_param).values_list('speciesId')
            ## Set queryset with species_list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')
        elif species_param is not None:
            # Get all the species with species = species_param
            species_list = Species.objects.filter(common_name__icontains=species_param).values_list('speciesId')
            # Set queryset with species_list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')

        return queryset

class RandomLandingPictureListAPIView(APIView):
    def get(self, request):
        try:
            picture = LandingPicture.objects.all().first()

            count = LandingPicture.objects.all().count()
            if (count > 1):
                picture = LandingPicture.objects.all()[random.randint(0, count - 1)] #single random object

            if picture:
                serializer = LandingPictureSerializer(picture)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class TaxonomyListAPIView(ListAPIView):
    queryset = Species.objects.all()
    serializer_class = TaxonomySerializer

class ArticleBySpeciesListAPIView(ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        species_param = self.request.query_params.get('species')
        if species_param is not None:
            article_list = Article.objects.filter(species=species_param).values_list('species')
            queryset = Article.objects.filter(species__in=article_list)
        return queryset

class ArticleByAuthorListAPIView(ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        author_param = self.request.query_params.get('author')
        species_param = self.request.query_params.get('species')
        if author_param is not None and species_param is not None:
            article_list = Article.objects.filter(author__name__icontains=author_param, species=species_param).values_list('title')
            queryset = Article.objects.filter(title__in=article_list)
        return queryset

class ArticleBySpeciesListAPIView(ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        species_param = self.request.query_params.get('species')
        if species_param is not None:
            article_list = Article.objects.filter(species=species_param).values_list('species')
            queryset = Article.objects.filter(species__in=article_list)
        return queryset

class ArticleByAuthorListAPIView(ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        author_param = self.request.query_params.get('author')
        species_param = self.request.query_params.get('species')
        if author_param is not None and species_param is not None:
            article_list = Article.objects.filter(author__name__icontains=author_param, species=species_param).values_list('title')
            queryset = Article.objects.filter(title__in=article_list)
        return queryset
