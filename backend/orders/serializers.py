from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from products.serializers import WatchSerializer

class CartItemSerializer(serializers.ModelSerializer):
    watch = WatchSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'watch', 'quantity', 'subtotal']
    
    def get_subtotal(self, obj):
        price = obj.watch.discount_price if obj.watch.discount_price else obj.watch.price
        return float(price) * obj.quantity

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total']

    def get_total(self, obj):
        total = 0
        for item in obj.items.all():
            price = item.watch.discount_price if item.watch.discount_price else item.watch.price
            total += float(price) * item.quantity
        return total

class OrderItemSerializer(serializers.ModelSerializer):
    watch = WatchSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['watch', 'quantity', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'status', 'total_amount', 'shipping_address', 'created_at', 'items']
        read_only_fields = ['total_amount', 'created_at']
