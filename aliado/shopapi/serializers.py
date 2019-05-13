from rest_framework import serializers
from django.contrib.auth.models import User
from shopapi.models import *

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    categoryName = serializers.CharField(required=False)
    categoryDescription = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Categories
        fields = ('id', 'categoryName', 'categoryDescription', 'image')


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    itemName = serializers.CharField(required=False)
    itemDescription = serializers.CharField(required=False)
    buyingPrice = serializers.IntegerField(required=False)
    sellingPrice = serializers.IntegerField(required=False)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ('id', 'itemName', 'itemDescription', 'buyingPrice', 'sellingPrice', 'category',  'image')


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    is_staff = serializers.BooleanField(required=False, default=False)
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_staff')


class OrdersSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    orderDate = serializers.DateTimeField(required=False)
    arriveDate = serializers.DateTimeField(required=False)
    isOrder = serializers.BooleanField(required=False)

    class Meta:
        model = Orders
        fields = ('id', 'orderDate', 'shipDate', 'arriveDate', 'user', 'items', 'isOrder', 'supId', 'deliveryMethod')

    def create(self, validated_data):
        items = validated_data.pop('items')
        instance = Orders.objects.create(**validated_data)
        instance.items.set(items)
        cost = 0
        if instance.isOrder:
            for i in items:
                cost += i.buyingPrice
                Inventory.objects.filter(id=i.id).update(stock=Inventory.objects.get(id=i.id).stock + 10)

        else:
            for i in items:
                cost += i.sellingPrice
                Inventory.objects.filter(id=i.id).update(stock=Inventory.objects.get(id=i.id).stock - 1)

        Transactions.objects.create(orderId=instance, cost=cost, isOrder=instance.isOrder)
        return instance


class SuppliersSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    supName = serializers.CharField(required=False)
    address = serializers.CharField(required=False)

    class Meta:
        model = Suppliers
        fields = ('id', 'supName', 'address', 'phoneNum', 'city')


class TransactionsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    cost = serializers.IntegerField(required=False)

    class Meta:
        model = Transactions
        fields = ('id', 'orderId', 'cost', 'isOrder')


class DeliveryMethodSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryMethod
        fields = '__all__'


class InventorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    amount = serializers.IntegerField(required=False)

    class Meta:
        model = Inventory
        fields = ('id', 'itemNum', 'amount')
