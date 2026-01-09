from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Brand, Watch, Wishlist
from .serializers import BrandSerializer, WatchSerializer, WishlistSerializer
from .permissions import IsWatchOwnerOrReadOnly, IsAdminOrReadOnly

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsAdminOrReadOnly]

class WatchViewSet(viewsets.ModelViewSet):
    queryset = Watch.objects.all()
    serializer_class = WatchSerializer
    permission_classes = [IsWatchOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand__name', 'description']
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        queryset = Watch.objects.all()
        collection_type = self.request.query_params.get('collection_type', None)
        if collection_type:
            queryset = queryset.filter(collection_type=collection_type)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_watches(self, request):
        watches = Watch.objects.filter(owner=request.user)
        serializer = self.get_serializer(watches, many=True)
        return Response(serializer.data)

class WishlistViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def toggle(self, request):
        watch_id = request.data.get('watch_id')
        if not watch_id:
            return Response({'error': 'watch_id required'}, status=400)
        
        try:
            watch = Watch.objects.get(pk=watch_id)
        except Watch.DoesNotExist:
            return Response({'error': 'Watch not found'}, status=404)
            
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        if watch in wishlist.watches.all():
            wishlist.watches.remove(watch)
            return Response({'status': 'removed', 'in_wishlist': False})
        else:
            wishlist.watches.add(watch)
            return Response({'status': 'added', 'in_wishlist': True})
