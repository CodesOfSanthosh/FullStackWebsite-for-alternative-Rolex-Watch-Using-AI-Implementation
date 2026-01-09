from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Auth Token Endpoints (Keep separate as they are specific to JWT)
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User CRUD Endpoints (via Router)
    # POST /api/users/ -> Register
    # GET /api/users/ -> List (Admin only or Self)
    # GET /api/users/me/ -> Current User Profile
    # GET /api/users/<id>/ -> Retrieve Custom User
    path('', include(router.urls)),
]
