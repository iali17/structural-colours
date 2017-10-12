from django.db import models
# from https://pypi.python.org/pypi/django-multiselectfield accessed Oct. 5, 2017
# MultiSelectFields store as CharField of comma-seperated values.
from multiselectfield import MultiSelectField

# Create your models here.
class Kingdom(models.Model):
    KINGDOM = (
        ('Eu', 'Eubacteria'),
        ('Ar', 'Archaebacteria'),
        ('Fu', 'Fungi'),
        ('Pl', 'Plantae'),
        ('An', 'Animalia'),
    )
    kingdom = models.CharField(primary_key=True, max_length=2, choices=KINGDOM)

    def __str__(self):
        return self.get_kingdom_display()

# Phylum class to hold valid phyllum values
# Foreign key to Kingdom
class Phylum(models.Model):
    phylum = models.CharField(max_length=50, primary_key=True)
    kingdom = models.ForeignKey(Kingdom)

    def __str__(self):
        return self.phylum

# Order class to hold valid class values
# Foreign key to Phylum
class Order(models.Model):
    order = models.CharField(max_length=50, primary_key=True)
    phylum = models.ForeignKey(Phylum)

    def __str__(self):
        return self.order

# Family class to hold valid family values
# Foreign key to Order
class Family(models.Model):
    family = models.CharField(max_length=50, primary_key=True)
    order = models.ForeignKey(Order)

    def __str__(self):
        return self.family

# Colour class to hold valid colour values
class Colour(models.Model):
    COLOUR = (
        ('R', 'Red'),
        ('O', 'Orange'),
        ('Y', 'Yellow'),
        ('G', 'Green'),
        ('B', 'Blue'),
        ('I', 'Indigo'),
        ('V', 'Violet'),
    )
    colour = models.CharField(primary_key=True, max_length=1, choices=COLOUR)

    def __str__(self):
        return self.get_colour_display()

# Species class to hold data about each species
class Species(models.Model):
    GROUP = (
        ('I', 'Invertebrates'),
        ('V', 'Vertebrates'),
    )
    TUNABLE = (
        ('A', 'Active'),
        ('P', 'Passive'),
    )
    STRUCTURE = (
        ('1', '1D'),
        ('2', '2D'),
        ('3', '3D'),
    )
    MECHANISM = (
        ('I', 'Interference'),
        ('S', 'Scattering'),
        ('D', 'Diffraction'),
    )
    INVISABLE = (
        ('U', 'UV'),
        ('I', 'IR'),
    )
    FUNCTIONS = (
        ('A', 'Aposematism'),
        ('C', 'Crypsis'),
        ('S', 'Sexual'),
        ('O', 'Other'),
    )
    GEOGRAPHY = (
        ('Am', 'Americas'),
        ('Eu', 'Europe'),
        ('Af', 'Africa'),
        ('As', 'Asia'),
        ('Oc', 'Oceania'),
    )
    ECOSYSTEM = (
        ('Fo', 'Forest'),
        ('De', 'Desert'),
        ('Gr', 'Grassland'),
        ('Mo', 'Mountain'),
        ('Ma', 'Marine'),
        ('Fr', 'Freshwater'),
    )
    speciesId = models.AutoField(primary_key=True)
    common_name = models.CharField(max_length=50)
    species = models.CharField(max_length=50, blank=True)
    family = models.ForeignKey(Family, blank=True, null=True)
    group = models.CharField(max_length=1, choices=GROUP, blank=True)
    sillouette = models.ImageField(upload_to='sillouettes/', blank=True)
    mechanism = MultiSelectField(choices=MECHANISM, blank=True)
    description = models.TextField(blank=True)
    structure = models.CharField(max_length=1, choices=STRUCTURE, blank=True)
    tunable = models.CharField(max_length=1, choices=TUNABLE, blank=True)
    wavelength = models.CharField(max_length=15, blank=True)
    iridescense = models.BooleanField()
    iridescense_factors = models.CharField(max_length=20, blank=True)
    invisable_Signals = MultiSelectField(choices=INVISABLE, blank=True)
    presumable_Functions = MultiSelectField(choices=FUNCTIONS, blank=True)
    geography = MultiSelectField(choices=GEOGRAPHY, blank=True)
    ecosystem = MultiSelectField(choices=ECOSYSTEM, blank=True)


    def __str__(self):
        return str(self.speciesId) + ' ' + self.species

# Class to connect species with colours (n-to-n)
# Foreign keys to Colour and Species
class SpeciesColour(models.Model):
    colour = models.ForeignKey(Colour)
    species = models.ForeignKey(Species)

    def __str__(self):
<<<<<<< HEAD
        return self.species.species + " " + self.colour.colour
=======
        return self.species + ", " + self.colour

>>>>>>> 3cde4843c860e06fbed29532d5709e9358a90eeb
# Picture class to hold images for species (1-to-n)
# Foreign key to Species
class Picture(models.Model):
    picture = models.ImageField(upload_to='pictures/', blank=True)
    species = models.ForeignKey(Species)

    def __str__(self):
        return self.species.common_name
