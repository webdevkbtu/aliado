from django.contrib.auth.models import User
from django.db import models
import django.utils.timezone as t


class Country(models.Model):
    countryName = models.CharField(max_length=20)

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'

    def __str__(self):
        return self.countryName


class City(models.Model):
    cityName = models.CharField(max_length=20)
    countryId = models.ForeignKey(Country, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.cityName


class DeliveryMethod(models.Model):
    methodDescription = models.CharField(max_length=20)
    avgDeliveryDays = models.IntegerField(default=1)

    class Meta:
        verbose_name = 'DeilveryMethod'
        verbose_name_plural = 'Methods'

    def __str__(self):
        return self.methodDescription


class Categories(models.Model):
    categoryName = models.CharField(max_length=20)
    categoryDescription = models.CharField(max_length=20)
    image = models.ImageField(blank=True, null=True, upload_to='')

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.categoryName


class Product(models.Model):
    itemName = models.CharField(max_length=20)
    itemDescription = models.CharField(max_length=200)
    buyingPrice = models.IntegerField()
    sellingPrice = models.IntegerField()
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='', blank=True, null=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.itemName


def default_time():
    return t.now() + t.timedelta(days=1)


def arrivedate():
    return t.now() + t.timedelta(days=5)


class Suppliers(models.Model):
    supName = models.CharField(max_length=20)
    address = models.CharField(max_length=20)
    phoneNum = models.IntegerField()
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Supplier'
        verbose_name_plural = 'Suppliers'

    def __str__(self):
        return self.supName


class OrdersManager(models.Manager):

    def get_time(self, date):
        return self.filter(arriveDate=date)



class Orders(models.Model):
    orderDate = models.DateTimeField(auto_now=True)
    shipDate = models.DateTimeField(default=default_time)
    deliveryMethod = models.ForeignKey(DeliveryMethod, on_delete=models.SET_NULL, null=True)
    arriveDate = models.DateTimeField(default=arrivedate)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    items = models.ManyToManyField(Product)
    isOrder = models.BooleanField(default=False)
    supId = models.ForeignKey(Suppliers, on_delete=models.SET_NULL, null=True)

    objects = OrdersManager()

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return "Order " + str(self.id)


class Transactions(models.Model):
    orderId = models.OneToOneField(Orders, on_delete=models.SET_NULL, null=True)
    cost = models.IntegerField()
    isOrder = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'

    def __str__(self):
        return "Transaction " + str(self.id)


class Inventory(models.Model):
    itemNum = models.ForeignKey(Product, on_delete=models.CASCADE)
    stock = models.IntegerField(null=True)
