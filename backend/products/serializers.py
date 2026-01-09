from rest_framework import serializers
from .models import Brand, Watch, Wishlist

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class WatchSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    brand_name = serializers.ReadOnlyField(source='brand.name') # For display
    
    class Meta:
        model = Watch
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    watches = WatchSerializer(many=True, read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'watches']
