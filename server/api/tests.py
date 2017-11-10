from django.test import TestCase
from api.api.views import *
from api.models import *
from django.db.utils import IntegrityError
from django.core.files.uploadedfile import SimpleUploadedFile
import os

class HierarchyTestCase(TestCase):
    # Create dummy objects for each table
    def setUp(self):
        Kingdom.objects.create(kingdom='Eu')
        Phylum.objects.create(phylum='phylum', kingdom=Kingdom.objects.get(kingdom='Eu'))
        Order.objects.create(order='order', phylum=Phylum.objects.get(phylum='phylum'))
        Family.objects.create(family='family', order=Order.objects.get(order='order'))
        Colour.objects.create(colour='R')
        Colour.objects.create(colour='Y')
        Species.objects.create(common_name='name',iridescense=False, speciesId=1)
        SpeciesColour.objects.create(colour=Colour.objects.get(colour='R'), species=Species.objects.get(common_name='name'))

    # Test data was added (UC4)
    def test_add_data(self):
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

    # Test data was edited (UC7)
    def test_edit_data(self):
        f = Species.objects.get(common_name='name')
        f.iridescense=True
        f.save()
        f = Species.objects.get(common_name='name')
        self.assertTrue(f.iridescense)


    # Test data was deleted (UC8)
    def test_delete_data(self):
        c = Colour.objects.get(colour='Y')
        c.delete()
        self.assertRaisesMessage(Colour.DoesNotExist, Colour.objects.get, colour='Y')

    # Test serializer contents
    def test_api_values(self):
        self.maxDiff =None
        self.assertEqual((SpeciesDetailAPIView().queryset[0].common_name), 'name')
        self.assertEqual((ColourListAPIView().queryset[0].colour), 'R')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.order), 'order')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.phylum.phylum), 'phylum')
        self.assertEqual((TaxonomyListAPIView().queryset[0].family), 'family')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.phylum.kingdom.kingdom), 'Eu')

    def test_image_insert(self):
        location = os.path.dirname(os.path.realpath(__file__)) + '/../media/media/test.png'
        image = SimpleUploadedFile(name='test.png', content=open(location, 'rb').read(), content_type='image/png')
        Picture.objects.create(picture=image, species=Species.objects.get(speciesId=1))
        p = Picture.objects.get(species=Species.objects.get(speciesId=1))
        self.assertEqual(str(p),'name')
        self.assertTrue('pictures/test' in str(p.picture))

    # Test order with empty order attribute creates Value Error
    def test_empty_order(self):
        with self.assertRaises(Exception) as raised:
            Order.objects.create(phylum = 'phylum')
        self.assertEqual(ValueError, type(raised.exception))

class InvalidInputTestCase(TestCase):
    def test_invalid_species_uniqueness(self):
        Species.objects.create(common_name='name',iridescense=False, speciesId='2')
        with self.assertRaises(Exception) as raised:
            Species.objects.create(common_name='name',iridescense=False, speciesId=2)
        self.assertEqual(IntegrityError, type(raised.exception))

    def test_invalid_species_family(self):
        with self.assertRaises(Exception) as raised:
            Species.objects.create(common_name='name',iridescense=False, family = 'non-existent')
        self.assertEqual(ValueError, type(raised.exception))

