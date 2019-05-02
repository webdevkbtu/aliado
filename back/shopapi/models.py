from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Categories(models.Model):
    categoryName = models.CharField(max_length=20)
    categoryDescription = models.CharField(max_length=20)


class Product(models.Model):
    itemName = models.CharField(max_length=20)
    itemDescription = models.CharField(max_length=200)
    buyingPrice = models.IntegerField()
    sellingPrice = models.IntegerField()
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField()

# class OrderItem(models.Model):
#     product = models.OneToOneField(Product, on_delete=models.SET_NULL, null=True)
#     is_ordered = models.BooleanField(default=True)
#     date_ordered = models.DateField()


class Orders(models.Model):
    orderDate = models.DateField(auto_now=True)
    userName = models.CharField(max_length=20)
    amount = models.IntegerField()
    items = models.ManyToManyField(Product)
    isOrder = models.BooleanField()


class Suppliers(models.Model):
    supName = models.CharField(max_length=20)
    address = models.CharField(max_length=20)
    supKind = models.OneToOneField(Categories, on_delete=models.SET_NULL, null=True)

# class Inventory(models.Model):
#     itemNum = models.ForeignKey(Product, on_delete=models.CASCADE)
#     instock = models.IntegerField()
#     orderID = models.ForeignKey(Orders, on_delete=models.CASCADE)


class ShoppingCart(models.Model):
    userID = models.OneToOneField(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(Product)


