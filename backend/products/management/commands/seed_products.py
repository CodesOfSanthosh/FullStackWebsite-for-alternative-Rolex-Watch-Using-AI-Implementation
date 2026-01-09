from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import Brand, Watch
from django.conf import settings
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with brands and watches'

    def handle(self, *args, **options):
        # Create Users
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123', role='ADMIN')
            self.stdout.write('Created admin user')
        
        if not User.objects.filter(username='watchowner').exists():
            User.objects.create_user('watchowner', 'owner@example.com', 'owner123', role='OWNER')
            self.stdout.write('Created owner user')
        
        owner = User.objects.get(username='watchowner')

        # Brands
        brand_names = ['Rolex', 'Omega', 'Casio', 'Seiko', 'Fossil', 'Titan', 'Tissot', 'Citizen', 'Apple', 'Samsung']
        for name in brand_names:
            brand, created = Brand.objects.get_or_create(name=name, defaults={'description': f'Luxury watches from {name}'})
            if created:
                self.stdout.write(f'Created brand {name}')
        
        # Watches
        watch_data = [
            {'name': 'Submariner', 'price': 10000, 'brand': 'Rolex'},
            {'name': 'Speedmaster', 'price': 4600, 'brand': 'Omega'},
            {'name': 'G-Shock', 'price': 100, 'brand': 'Casio'},
            {'name': 'Presage', 'price': 450, 'brand': 'Seiko'},
            {'name': 'Gen 6', 'price': 299, 'brand': 'Fossil'},
            {'name': 'Edge', 'price': 150, 'brand': 'Titan'},
            {'name': 'PRX', 'price': 350, 'brand': 'Tissot'},
            {'name': 'Eco-Drive', 'price': 200, 'brand': 'Citizen'},
            {'name': 'Series 9', 'price': 399, 'brand': 'Apple'},
            {'name': 'Galaxy Watch 6', 'price': 299, 'brand': 'Samsung'},
        ]

        for data in watch_data:
             brand = Brand.objects.get(name=data['brand'])
             w, created = Watch.objects.get_or_create(
                 name=data['name'],
                 defaults={
                     'owner': owner,
                     'brand': brand,
                     'description': f"A premium watch from {brand.name}. Lorem ipsum dolor sit amet.",
                     'price': data['price'],
                     'stock': 10,
                     'dial_color': 'Black',
                     'strap_type': 'Metal',
                     'water_resistance': '100m',
                     'warranty': '2 Years'
                 }
             )
             if created:
                 self.stdout.write(f'Created watch {w.name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
