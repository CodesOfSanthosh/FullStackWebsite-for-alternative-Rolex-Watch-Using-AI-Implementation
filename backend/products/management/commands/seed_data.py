from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import Brand, Watch
from django.core.files import File
from django.conf import settings
import os
from decimal import Decimal

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Create Admin User
        admin_email = 'admin@example.com'
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': admin_email,
                'is_staff': True,
                'is_superuser': True,
                'role': 'ADMIN',
                'first_name': 'Admin',
                'last_name': 'User'
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS(f'Created admin user: admin / admin123'))
        else:
            self.stdout.write('Admin user already exists')

        # 2. Create Brands
        brands_data = [
            {'name': 'Rolex', 'description': 'A crown for every achievement.'},
            {'name': 'Patek Philippe', 'description': 'You never actually own a Patek Philippe. You merely look after it for the next generation.'},
            {'name': 'Omega', 'description': 'Exact time for life.'},
            {'name': 'Audemars Piguet', 'description': 'To break the rules, you must first master them.'},
        ]
        
        brands = {}
        for b_data in brands_data:
            brand, _ = Brand.objects.get_or_create(name=b_data['name'], defaults={'description': b_data['description']})
            brands[b_data['name']] = brand
            self.stdout.write(f"Brand {b_data['name']} ready.")

        # 3. Create Watches
        # Verify images exist
        media_watches_dir = os.path.join(settings.MEDIA_ROOT, 'watches')
        
        watches_data = [
            {
                'brand': 'Rolex',
                'name': 'Submariner Date',
                'description': 'The benchmark of all divers\' watches. Featuring a black dial and a rotatable bezel with a Cerachrom insert.',
                'price': 10250.00,
                'stock': 5,
                'props': {'strap_type': 'Oystersteel', 'dial_color': 'Black', 'water_resistance': '300m', 'warranty': '5 Years'},
                'image_file': 'rolex.png'
            },
            {
                'brand': 'Patek Philippe',
                'name': 'Calatrava',
                'description': 'A pure and timeless design that reflects the essence of the round wristwatch.',
                'price': 32000.00,
                'stock': 2,
                'props': {'strap_type': 'Alligator Leather', 'dial_color': 'White', 'water_resistance': '30m', 'warranty': '2 Years'},
                'image_file': 'patek.png'
            },
            {
                'brand': 'Omega',
                'name': 'Speedmaster Moonwatch',
                'description': 'The Speedmaster has been a part of all six lunar missions and is an impressive representation of the brand’s pioneering spirit.',
                'price': 7600.00,
                'stock': 8,
                'props': {'strap_type': 'Stainless Steel', 'dial_color': 'Black', 'water_resistance': '50m', 'warranty': '5 Years'},
                'image_file': 'omega.png'
            },
            {
                'brand': 'Audemars Piguet',
                'name': 'Royal Oak Selfwinding',
                'description': 'With its steel case, octagonal bezel, “Tapisserie” dial and integrated bracelet, the Royal Oak overturned the prevailing codes in 1972.',
                'price': 27800.00,
                'stock': 3,
                'props': {'strap_type': 'Integrated Steel', 'dial_color': 'Blue', 'water_resistance': '50m', 'warranty': '3 Years'},
                'image_file': 'ap.png'
            }
        ]

        for w_data in watches_data:
            if Watch.objects.filter(name=w_data['name']).exists():
                self.stdout.write(f"Watch {w_data['name']} already exists.")
                continue

            image_path = os.path.join(media_watches_dir, w_data['image_file'])
            if not os.path.exists(image_path):
                self.stdout.write(self.style.WARNING(f"Image {w_data['image_file']} not found in {media_watches_dir}. Skipping."))
                continue

            watch = Watch(
                owner=admin_user,
                brand=brands[w_data['brand']],
                name=w_data['name'],
                description=w_data['description'],
                price=Decimal(str(w_data['price'])),
                stock=w_data['stock'],
                strap_type=w_data['props']['strap_type'],
                dial_color=w_data['props']['dial_color'],
                water_resistance=w_data['props']['water_resistance'],
                warranty=w_data['props']['warranty'],
                image=f"watches/{w_data['image_file']}" # The field just stores the relative path strings
            )
            watch.save()
            self.stdout.write(self.style.SUCCESS(f"Created watch: {w_data['name']}"))

        self.stdout.write(self.style.SUCCESS('Seeding completed.'))
