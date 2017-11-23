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
        SpeciesClass.objects.create(speciesClass='class', phylum=Phylum.objects.get(phylum='phylum'))
        Order.objects.create(order='order', speciesClass=SpeciesClass.objects.get(speciesClass='class'))
        Family.objects.create(family='family', order=Order.objects.get(order='order'))
        Species.objects.create(common_name='name',iridescense=False, speciesId=1, colour='R,G')
        Species.objects.create(common_name='delete',iridescense=False, speciesId=2)

    # Test data was added (UC4)
    def test_add_data(self):
        k = Kingdom.objects.get(kingdom='Eu')
        p = Phylum.objects.get(phylum='phylum')
        o = Order.objects.get(order='order')
        sc = SpeciesClass.objects.get(speciesClass='class')
        f = Family.objects.get(family='family')
        s = Species.objects.get(common_name='name')
        self.assertEqual(k.get_kingdom_display(), 'Eubacteria')
        self.assertEqual(str(p), 'phylum')
        self.assertEqual(str(o), 'order')
        self.assertEqual(str(sc), 'class')
        self.assertEqual(str(f), 'family')
        self.assertEqual(str(s), '1 name')

    # Test data was edited (UC7)
    def test_edit_data(self):
        f = Species.objects.get(common_name='name')
        f.iridescense=True
        f.save()
        f = Species.objects.get(common_name='name')
        self.assertTrue(f.iridescense)


    # Test data was deleted (UC8)
    def test_delete_data(self):
        s = Species.objects.get(common_name='delete')
        s.delete()
        self.assertRaisesMessage(Species.DoesNotExist, Species.objects.get, common_name='delete')

    # Test serializer contents
    def test_api_values(self):
        self.maxDiff =None
        self.assertEqual((SpeciesDetailAPIView().queryset[0].common_name), 'name')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.order), 'order')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.speciesClass.phylum.phylum), 'phylum')
        self.assertEqual((TaxonomyListAPIView().queryset[0].family), 'family')
        self.assertEqual((TaxonomyListAPIView().queryset[0].order.speciesClass.phylum.kingdom.kingdom), 'Eu')
    # Test adding image
    # NOTE: Requires test.png image file in server/media/media
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
            SpeciesClass.objects.create(phylum = 'phylum')
        self.assertEqual(ValueError, type(raised.exception))

class InvalidInputTestCase(TestCase):
    # Test adding species with duplicate speciesId (Should fail)
    def test_invalid_species_uniqueness(self):
        Species.objects.create(common_name='name',iridescense=False, speciesId='2')
        with self.assertRaises(Exception) as raised:
            Species.objects.create(common_name='name',iridescense=False, speciesId=2)
        self.assertEqual(IntegrityError, type(raised.exception))

    # Test adding species with a non-existent family name (Should fail)
    def test_invalid_species_family(self):
        with self.assertRaises(Exception) as raised:
            Species.objects.create(common_name='name',iridescense=False, family = 'non-existent')
        self.assertEqual(ValueError, type(raised.exception))

