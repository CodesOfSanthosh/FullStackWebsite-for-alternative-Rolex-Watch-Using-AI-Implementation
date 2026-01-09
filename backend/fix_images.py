import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_core.settings')
django.setup()

from products.models import Watch

# Semantic mapping
mapping = {
    'Submariner': 'watches/rolex.png',
    'Speedmaster': 'watches/omega.png',
    'Submariner Date': 'watches/rolex.png', 
    'Speedmaster Moonwatch': 'watches/omega.png',
    'Calatrava': 'watches/patek.png',
    'Royal Oak Selfwinding': 'watches/ap.png'
}

# Fallback for others
default_image = 'watches/rolex.png'

watches = Watch.objects.all()
for watch in watches:
    if not watch.image:
        # Try to find a match by name
        new_img = mapping.get(watch.name)
        
        # If no exact name match, try partial
        if not new_img:
            if 'Rolex' in watch.brand.name:
                new_img = 'watches/rolex.png'
            elif 'Omega' in watch.brand.name:
                new_img = 'watches/omega.png'
            elif 'Patek' in watch.brand.name:
                new_img = 'watches/patek.png'
            elif 'Audemars' in watch.brand.name:
                new_img = 'watches/ap.png'
            else:
                new_img = default_image
        
        print(f"Updating {watch.name} with {new_img}")
        watch.image = new_img
        watch.save()
    else:
        print(f"{watch.name} already has image: {watch.image}")

print("Done updating images.")
