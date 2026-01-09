import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_core.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def setup_default_admin():
    username = "admin"
    email = "admin@rolex.com"
    password = "admin" # Simple for dev

    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    user.set_password(password)
    user.role = 'ADMIN'
    user.is_staff = True
    user.is_superuser = True
    user.save()

    if created:
        print(f"SUCCESS: Created new admin user '{username}'")
    else:
        print(f"SUCCESS: Updated existing user '{username}' to Admin role and reset password.")

if __name__ == '__main__':
    setup_default_admin()
