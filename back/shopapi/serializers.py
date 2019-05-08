from shopapi.models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    categoryName = serializers.CharField(required=False)
    categoryDescription = serializers.CharField(required=False)

    class Meta:
        model = Categories
        fields = ('id', 'categoryName', 'categoryDescription')


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    itemName = serializers.CharField(required=False)
    itemDescription = serializers.CharField(required=False)
    buyingPrice = serializers.IntegerField(required=False)
    sellingPrice = serializers.IntegerField(required=False)
    categoryID = serializers.IntegerField(read_only=True)
    stock = serializers.IntegerField(required=False)

    class Meta:
        model = Product
        fields = ('id', 'itemName', 'itemDescription', 'buyingPrice', 'sellingPrice', 'categoryID', 'stock')


class OrdersSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    orderDate = serializers.DateField(required=False)
    userID = serializers.IntegerField(read_only=True)
    amount = serializers.IntegerField(required=False)
    items = ProductSerializer(many=True)

    class Meta:
        model = Orders
        fields = ('id', 'orderDate', 'userID', 'amount', 'items')


class SuppliersSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    supName = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    supKind = CategorySerializer(required=False)

    class Meta:
        model = Suppliers
        fields = ('id', 'supName', 'address', 'supKind')


class ShoppingCartSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    userID = serializers.IntegerField(read_only=True)
    items = ProductSerializer(many=True)

    class Meta:
        model = ShoppingCart
        fields = ('id', 'userID', 'items')


class Transactions(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    userID = serializers.IntegerField(read_only=True)
    cost = serializers.IntegerField(required=False)
    isOrder = serializers.BooleanField()

    class Meta:
        model = Transactions
        fields = ('id', 'userID', 'cost', 'isOrder')

