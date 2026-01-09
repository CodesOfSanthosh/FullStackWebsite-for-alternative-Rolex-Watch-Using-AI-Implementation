from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates a default admin user'

    def handle(self, *args, **options):
        username = 'admin'
        email = 'admin@rolex.com'
        password = 'admin'

        user, created = User.objects.get_or_create(username=username, defaults={'email': email})
        user.set_password(password)
        user.role = 'ADMIN'
        user.is_staff = True
        user.is_superuser = True
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin user "{username}"'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Successfully updated admin user "{username}"'))
