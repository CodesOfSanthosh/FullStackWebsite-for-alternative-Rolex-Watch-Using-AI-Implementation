from django.db import models
from django.conf import settings

class Brand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)

    def __str__(self):
        return self.name

class Watch(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='watches')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='watches')
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stock = models.PositiveIntegerField(default=0)
    
    # Specs
    strap_type = models.CharField(max_length=100, blank=True)
    dial_color = models.CharField(max_length=50, blank=True)
    water_resistance = models.CharField(max_length=50, blank=True)
    warranty = models.CharField(max_length=100, blank=True)
    
    # Rolex Specifics
    COLLECTION_CHOICES = [
        ('CLASSIC', 'Classic Watches'),
        ('PROFESSIONAL', 'Professional Watches'),
    ]
    collection_type = models.CharField(max_length=20, choices=COLLECTION_CHOICES, default='CLASSIC')
    case_material = models.CharField(max_length=100, blank=True, help_text="e.g. Oystersteel")
    movement = models.CharField(max_length=100, blank=True, help_text="e.g. Perpetual, mechanical, self-winding")
    diameter = models.CharField(max_length=50, blank=True, help_text="e.g. 41 mm")
    bezel = models.CharField(max_length=100, blank=True, help_text="e.g. Fluted")
    
    image = models.ImageField(upload_to='watches/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Wishlist(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlist')
    watches = models.ManyToManyField(Watch, related_name='wishlisted_by', blank=True)

    def __str__(self):
        return f"{self.user.username}'s Wishlist"
