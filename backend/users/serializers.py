from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name']
        read_only_fields = ['role'] 

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name']
        # Role is writable here

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.Roles.choices, default=User.Roles.CUSTOMER) # Allow role input

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'role']

    def create(self, validated_data):
        # Extract role to prevent it being passed to create_user (if create_user doesn't handle it directly)
        role = validated_data.pop('role', User.Roles.CUSTOMER)
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        user.role = role
        user.save()
        return user
