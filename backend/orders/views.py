from rest_framework import viewsets, permissions, status
import json
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart, CartItem, Order, OrderItem
from products.models import Watch
from .serializers import CartSerializer, OrderSerializer

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        watch_id = request.data.get('watch_id')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            watch = Watch.objects.get(pk=watch_id)
        except Watch.DoesNotExist:
            return Response({'error': 'Watch not found'}, status=404)
        
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, watch=watch)
        
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
            
        cart_item.save()
        return Response({'status': 'added', 'cart': CartSerializer(cart).data})

    @action(detail=False, methods=['post'])
    def remove(self, request):
        item_id = request.data.get('item_id')
        try:
            item = CartItem.objects.get(pk=item_id, cart__user=request.user)
            item.delete()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)
        
        cart = Cart.objects.get(user=request.user)
        return Response({'status': 'removed', 'cart': CartSerializer(cart).data})
    
    @action(detail=False, methods=['post'])
    def update_item(self, request):
        item_id = request.data.get('item_id')
        quantity = int(request.data.get('quantity', 1))
         
        try:
            item = CartItem.objects.get(pk=item_id, cart__user=request.user)
            if quantity > 0:
                item.quantity = quantity
                item.save()
            else:
                item.delete()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)
            
        cart = Cart.objects.get(user=request.user)
        return Response({'status': 'updated', 'cart': CartSerializer(cart).data})

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
            
        shipping_address = request.data.get('shipping_address')
        if not shipping_address:
            return Response({'error': 'Shipping address required'}, status=400)
        
        # Calculate total
        total = 0
        order_items = []
        
        for item in cart.items.all():
            price = item.watch.discount_price if item.watch.discount_price else item.watch.price
            total += float(price) * item.quantity
            order_items.append({
                'watch': item.watch,
                'quantity': item.quantity,
                'price': price
            })
            
        # Create Order
        order = Order.objects.create(
            user=request.user,
            total_amount=total,
            shipping_address=shipping_address,
            status='PENDING'
        )
        
        # Create Order Items and decrease stock
        for item_data in order_items:
            OrderItem.objects.create(
                order=order,
                watch=item_data['watch'],
                quantity=item_data['quantity'],
                price_at_purchase=item_data['price']
            )
            # Decrease stock
            item_data['watch'].stock -= item_data['quantity']
            item_data['watch'].save()
            
        # Clear Cart
        cart.items.all().delete()
        
        # Custom Response Format
        response_data = {
            "username": request.user.username,
            "order_placed_product": [item['watch'].name for item in order_items],
            "time": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "message": "Order placed will be delivered in 7 working days",
            "order_details": OrderSerializer(order).data
        }
        
        print("CHECKOUT JSON:", json.dumps(response_data, indent=4))
        return Response(response_data, status=status.HTTP_201_CREATED)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', '') == 'ADMIN':
            return Order.objects.all()
        return Order.objects.filter(user=user)

    def update(self, request, *args, **kwargs):
        # Restriction: Only Admins can update orders
        if getattr(request.user, 'role', '') != 'ADMIN':
             return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)
