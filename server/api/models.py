from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

# Species class to hold data about each species
# Common name is primary key
class Species(models.Model):
    KINGDOM = (
        ('Eu', 'Eubacteria'),
        ('Ar', 'Archaebacteria'),
        ('Fu', 'Fungi'),
        ('Pl', 'Plantae'),
        ('An', 'Animalia'),
    )
    GROUP = (
        ('I', 'Invertebrates'),
        ('V', 'Vertebrates'),
    )
    TUNABLE = (
        ('A', 'Active'),
        ('P', 'Passive'),
    )
    COLOUR = (
        ('R', 'Red'),
        ('O', 'Orange'),
        ('Y', 'Yellow'),
        ('G', 'Green'),
        ('B', 'Blue'),
        ('I', 'Indigo'),
        ('V', 'Violet'),
    )
    kingdom = models.CharField(max_length=2, choices=KINGDOM)
    group = models.CharField(max_length=1, choices=GROUP, blank=True)
    phylum = models.ForeignKey(Phylum, blank=True)
    order = models.ForeignKey(Order, blank=True)
    species = models.CharField(max_length=50, blank=True)
    family = models.ForeignKey(Family, blank=True)
    common_name = models.CharField(max_length=50, primary_key=True)
    sillouette = models.ImageField(upload_to='sillouettes/', blank=True)
    picture1 = models.ImageField(upload_to='pictures/', blank=True)
    picture2 = models.ImageField(upload_to='pictures/', blank=True)
    picture3 = models.ImageField(upload_to='pictures/', blank=True)
    picture4 = models.ImageField(upload_to='pictures/', blank=True)
    picture5 = models.ImageField(upload_to='pictures/', blank=True)
    interference = models.BooleanField(default=False)
    scattering = models.BooleanField(default=False)
    diffraction = models.BooleanField(default=False)
    description = models.TextField(blank=True, blank=True)
    structure = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)], blank=True)
    tunable = models.CharField(max_length=1, choices=TUNABLE, blank=True)
    colour = models.CharField(max_length=1, choices=COLOUR)
    colour2 = models.CharField(max_length=1, choices=COLOUR, blank=True)
    wavelength = models.CharField(max_length=15, blank=True)
    iridescense = models.BooleanField()
    iridescense_factors = models.CharField(max_length=20, blank=True)
    uv = models.BooleanField(default=False)
    ir = models.BooleanField(default=False)
    aposematism = models.BooleanField(default=False)
    crypsis = models.BooleanField(default=False)
    sexual = models.BooleanField(default=False)
    other_function = models.BooleanField(default=False)
    americas = models.BooleanField(default=False)
    europe = models.BooleanField(default=False)
    africa = models.BooleanField(default=False)
    asia = models.BooleanField(default=False)
    oceania = models.BooleanField(default=False)
    forest = models.BooleanField(default=False)
    desert = models.BooleanField(default=False)
    grassland = models.BooleanField(default=False)
    mountain = models.BooleanField(default=False)
    marine = models.BooleanField(default=False)
    freshwater = models.BooleanField(default=False)

# Phylum class to hold valid phyllum values
class Phylum(models.Model):
    phylum = models.CharField(max_length=50, primary_key=True)

# Order class to hold valid class values
class Order(models.Model):
    order = models.CharField(max_length=50, primary_key=True)

# Family class to hold valid family values
class Family(models.Model):
    family = models.CharField(max_length=50, primary_key=True)
