from django.urls import path

from shopapi.authentication import login, logout, signup, UserList
from shopapi.views import *


urlpatterns = [
    path('categories/', CategoryGetCreate.as_view()),
    path('categories/<int:pk>/', CategoryDetail.as_view()),
    path('categories/<int:pk>/products/', ProductGetCreate.as_view()),
    path('products/<int:pk>/', ProductDetail.as_view()),
    path('orders/', OrdersGetCreate.as_view()),
    path('login/', login),
    path('logout/', logout),
    path('signup/', signup),
    path('users/', UserList.as_view())
]
