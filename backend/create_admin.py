import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_core.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_admin():
    print("--- Create Admin User ---")
    username = input("Username: ")
    email = input("Email: ")
    password = input("Password: ")

    if User.objects.filter(username=username).exists():
        print(f"User '{username}' already exists. Updating role to ADMIN.")
        user = User.objects.get(username=username)
        user.role = 'ADMIN'
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print("User updated successfully.")
    else:
        user = User.objects.create_user(username=username, email=email, password=password)
        user.role = 'ADMIN'
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print("Admin user created successfully.")

if __name__ == '__main__':
    create_admin()
