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
            species_list = SpeciesColour.objects.filter(colour__colour=colour_param, species__common_name__icontains=species_param).values_list('species')
            # Set queryset with species_list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')
        elif colour_param is not None:
            # Get all the species with colour = colour_param
            species_list = SpeciesColour.objects.filter(colour__colour=colour_param).values_list('species')
            ## Set queryset with species_list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')
        elif species_param is not None:
            # Get all the species with species = species_param
            species_list = SpeciesColour.objects.filter(species__common_name__icontains=species_param).values_list('species')
            # Set queryset with species_list
            queryset = Picture.objects.filter(species__in=species_list).order_by('id')

        return queryset

class RandomLandingPictureListAPIView(ListAPIView):
    serializer_class = LandingPictureSerializer

    def get_queryset(self):
        count = LandingPicture.objects.all().count()
        if (count > 4):
            index = random.random() * (count - 4)
            queryset = LandingPicture.objects.all()[index: index + 4]
        else:
            queryset = LandingPicture.objects.all()

        return queryset

class TaxonomyListAPIView(ListAPIView):
    queryset = Family.objects.all()
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
