from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import Brand, Watch

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with Professional and Gold watches'

    def handle(self, *args, **options):
        # Ensure owner exists
        if not User.objects.filter(username='watchowner').exists():
            User.objects.create_user('watchowner', 'owner@example.com', 'owner123', role='OWNER')
        
        owner = User.objects.get(username='watchowner')
        rolex, _ = Brand.objects.get_or_create(name='Rolex')

        watches = [
            # Professional Collection
            {
                'name': 'Cosmograph Daytona',
                'description': 'The ultimate tool watch for those with a passion for driving and speed.',
                'price': 14500,
                'collection_type': 'PROFESSIONAL',
                'image': 'https://images.unsplash.com/photo-1622434641406-a158105c9168?q=80&w=2360&auto=format&fit=crop'
            },
            {
                'name': 'Submariner Date',
                'description': 'The reference among divers\' watches.',
                'price': 10250,
                'collection_type': 'PROFESSIONAL',
                'image': 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop'
            },
            {
                'name': 'GMT-Master II',
                'description': 'Designed to show the time in two different time zones simultaneously.',
                'price': 10900,
                'collection_type': 'PROFESSIONAL',
                'image': 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1988&auto=format&fit=crop'
            },
            # Gold Watches
            {
                'name': 'Day-Date 40 Gold',
                'description': '18 ct yellow gold, fluted bezel. The ultimate watch of prestige.',
                'price': 38500,
                'collection_type': 'CLASSIC',
                'image': 'https://images.unsplash.com/photo-1629581332399-aa572798e3b0?q=80&w=1974&auto=format&fit=crop'
            },
            {
                'name': 'Sky-Dweller Gold',
                'description': '18 ct Everose gold with Oysterflex bracelet.',
                'price': 42000,
                'collection_type': 'CLASSIC',
                'image': 'https://images.unsplash.com/photo-1639031731674-6f34e6012e0e?q=80&w=2070&auto=format&fit=crop'
            },
             {
                'name': 'Yacht-Master 42 Gold',
                'description': '18 ct yellow gold with Oysterflex bracelet. Professional Gold.',
                'price': 29300,
                'collection_type': 'PROFESSIONAL',
                'image': 'https://images.unsplash.com/photo-1623190863777-1c39af610ef7?q=80&w=2070&auto=format&fit=crop'
            }
        ]

        for w_data in watches:
            Watch.objects.get_or_create(
                name=w_data['name'],
                defaults={
                    'owner': owner,
                    'brand': rolex,
                    'description': w_data['description'],
                    'price': w_data['price'],
                    'collection_type': w_data['collection_type'],
                    'stock': 5,
                    'image': w_data['image'],
                    'case_material': 'Gold' if 'Gold' in w_data['name'] else 'Oystersteel'
                }
            )
            self.stdout.write(f"Created/Verified {w_data['name']}")

        self.stdout.write(self.style.SUCCESS('Successfully seeded Professional and Gold watches'))
