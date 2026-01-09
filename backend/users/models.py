from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        OWNER = 'OWNER', 'Watch Owner'
        CUSTOMER = 'CUSTOMER', 'Customer'

    role = models.CharField(max_length=10, choices=Roles.choices, default=Roles.CUSTOMER)

    def is_owner(self):
        return self.role == self.Roles.OWNER

    def is_customer(self):
        return self.role == self.Roles.CUSTOMER

    def is_admin(self):
        return self.role == self.Roles.ADMIN
