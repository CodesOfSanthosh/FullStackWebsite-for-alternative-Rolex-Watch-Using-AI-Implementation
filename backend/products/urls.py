from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BrandViewSet, WatchViewSet, WishlistViewSet

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'watches', WatchViewSet)
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
]
