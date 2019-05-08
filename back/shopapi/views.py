from django.shortcuts import render
from rest_framework import generics
from shopapi.models import *
from shopapi.serializers import *
from django.http import Http404


class CategoryGetCreate(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        print(Categories.objects.get(id=self.kwargs['pk']))
        return Categories.objects.filter(id=self.kwargs['pk'])


class ProductGetCreate(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        try:
            category = Categories.objects.get(id=self.kwargs['pk'])
        except Categories.DoesNotExist:
            raise Http404

        queryset = category.product_set.all()
        return queryset

    def perform_create(self, serializer):
        print(self.kwargs)
        serializer.save(category=Categories.objects.get(id=self.kwargs['pk']))


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        print(Product.objects.filter(id=self.kwargs['pk']))
        queryset = Product.objects.filter(id=self.kwargs['pk'])
        return queryset


class OrdersGetCreate(generics.ListCreateAPIView):
    serializer_class = OrdersSerializer

    def get_queryset(self):
        return Orders.objects.all()

    def perform_create(self, serializer):
        serializer.save(userID=self.request.user.id)
