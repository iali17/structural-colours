from django.test import TestCase
from api.api.views import *
from api.models import *

class HierarchyTestCase(TestCase):
    # Create dummy objects for each table
    def setUp(self):
        Kingdom.objects.create(kingdom='Eu')
        Phylum.objects.create(phylum='phylum', kingdom=Kingdom.objects.get(kingdom='Eu'))
        Order.objects.create(order='order', phylum=Phylum.objects.get(phylum='phylum'))
        Family.objects.create(family='family', order=Order.objects.get(order='order'))
        Colour.objects.create(colour='R')
        Species.objects.create(common_name='name',iridescense=False)
        SpeciesColour.objects.create(colour=Colour.objects.get(colour='R'), species=Species.objects.get(common_name='name'))

    # Test database contents
    def test_kingdom_value(self):
        k = Kingdom.objects.get(kingdom='Eu')
        p = Phylum.objects.get(phylum='phylum')
        o = Order.objects.get(order='order')
        f = Family.objects.get(family='family')
        s = Species.objects.get(common_name='name')
        sc = SpeciesColour.objects.get(colour='R', species='1')
        self.assertEqual(k.get_kingdom_display(), 'Eubacteria')
        self.assertEqual(str(p), 'phylum')
        self.assertEqual(str(o), 'order')
        self.assertEqual(str(f), 'family')
        self.assertEqual(str(s), '1 name')
        self.assertEqual(str(sc), '1 name, Red')

    # Test serializer contents
    def test_api_values(self):
        self.maxDiff =None
        self.assertEqual((SpeciesDetailAPIView().queryset[0].common_name), 'name')
        self.assertEqual((ColourListAPIView().queryset[0].colour), 'R')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.order), 'order')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.phylum.phylum), 'phylum')
        self.assertEqual((TaxonomyListAPIView().queryset[0].family), 'family')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.phylum.kingdom.kingdom), 'Eu')


