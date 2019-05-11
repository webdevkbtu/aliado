from django.contrib import admin
from shopapi.models import *
# Register your models here.
admin.site.register(Categories)
admin.site.register(Product)
admin.site.register(Orders)
admin.site.register(Suppliers)
admin.site.register(ShoppingCart)
admin.site.register(Transactions)
