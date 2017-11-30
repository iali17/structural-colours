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
    PhylumSerializer,
    ClassSerializer,
    OrderSerializer,
    FamilySerializer,
    SpeciesSerializer,
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

class PhylumByKingdomListAPIView(ListAPIView):
    serializer_class = PhylumSerializer

    def get_queryset(self):
        queryset = Phylum.objects.all()
        kingdom_param = self.request.query_params.get('kingdom')
        if kingdom_param is not None:
            phylum_list = Phylum.objects.filter(kingdom=kingdom_param).values_list('phylum')
            queryset = Phylum.objects.filter(phylum__in=phylum_list)
        return queryset

class ClassByPhylumListAPIView(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        queryset = SpeciesClass.objects.all()
        phylum_param = self.request.query_params.get('phylum')
        if phylum_param is not None:
            class_list = SpeciesClass.objects.filter(phylum=phylum_param).values_list('speciesClass')
            queryset = Order.objects.filter(order__in=class_list)
        return queryset

class OrderByClassListAPIView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        class_param = self.request.query_params.get('class')
        if class_param is not None:
            order_list = Order.objects.filter(speciesClass=class_param).values_list('order')
            queryset = Order.objects.filter(order__in=order_list)
        return queryset

class FamilyByOrderListAPIView(ListAPIView):
    serializer_class = FamilySerializer

    def get_queryset(self):
        queryset = Family.objects.all()
        order_param = self.request.query_params.get('order')
        if order_param is not None:
            family_list = Family.objects.filter(order=order_param).values_list('family')
            queryset = Family.objects.filter(family__in=family_list)
        return queryset

class SpeciesByFamilyListAPIView(ListAPIView):
    serializer_class = SpeciesSerializer

    def get_queryset(self):
        queryset = Species.objects.all()
        family_param = self.request.query_params.get('family')
        if family_param is not None:
            species_list = Species.objects.filter(family=family_param).values_list('species')
            queryset = Species.objects.filter(species__in=species_list)
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
