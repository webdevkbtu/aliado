from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from shopapi.models import *
from shopapi.serializers import *
from django.http import Http404


class CategoryGetCreate(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        print(Categories.objects.get(id=1).image.path)
        print(Categories.objects.get(id=self.kwargs['pk']))
        return Categories.objects.filter(id=self.kwargs['pk'])


class AllProducts(APIView):

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



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
    permission_classes = (IsAdminUser, )

    def get_queryset(self):
        return Orders.objects.all()

    def perform_create(self, serializer):
        print(serializer.validated_data)
        serializer.save(userID=self.request.user)


class ShoppingCart(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request):
        cart = ShoppingCart.objects.get(userID=request.user)
        serializer = ShoppingCartSerializer(data=request.data, instance=cart)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


