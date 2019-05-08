from django.urls import path
from shopapi.views import *

urlpatterns = [
    path('categories/', CategoryGetCreate.as_view()),
    path('categories/<int:pk>/', CategoryDetail.as_view()),
    path('categories/<int:pk>/products/', ProductGetCreate.as_view()),
    path('products/<int:pk>/', ProductDetail.as_view()),
    path('orders/', OrdersGetCreate.as_view())
]
