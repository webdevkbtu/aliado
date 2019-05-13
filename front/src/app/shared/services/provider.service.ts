import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';
import {IAuthResponse, ICategory, IDeliveryMethod, IOrder, IProduct, ISuppliers} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {


  constructor(http: HttpClient) {
    super(http);
  }

  getCategories(): Promise<ICategory[]> {
    return this.get('http://localhost:8000/shop/categories/', {});
  }

  getCategory(id: number): Promise<ICategory> {
    return this.get(`http://localhost:8000/shop/categories/${id}/`, {});
  }

  createCategory(name: any, description: any): Promise<ICategory> {
    return this.post('http://localhost:8000/shop/categories/', {
      categoryName: name,
      categoryDescription: description
    });
  }

  updateCategory(category: ICategory): Promise<ICategory> {
    return this.put(`http://localhost:8000/shop/categories/${category.id}/`, {
      categoryName: category.categoryName,
      categoryDescription: category.categoryName
    });
  }

  deleteCategory(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/shop/categories/${id}/`, {});
  }

  getProducts(category: ICategory): Promise<IProduct[]> {
    return this.get(`http://localhost:8000/shop/categories/${category.id}/products/`, {});
  }

  getProduct(id: number): Promise<IProduct> {
    return this.get(`http://localhost:8000/shop/products/${id}/`, {});
  }

  getAllProducts(): Promise<IProduct[]> {
    return this.get(`http://localhost:8000/shop/products/`, {});
  }

  // addProduct(): Promise<> {
  //
  // }
  //dobavit' model shopping cart, zamutit' method, products
  createProduct(product: IProduct): Promise<any> {
    return this.post(`http://localhost:8000/shop/categories/${product.category}/products/`, {
      itemName: product.itemName,
      itemDescription: product.itemDescription,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      categoryID: product.category,
    });
  }

  getOrders(): Promise<IOrder[]> {
    return this.get(`http://localhost:8000/shop/orders/`, {});
  }
  createOrder(items: number[], isOrder: boolean, supId: number, deliveryMethod: number): Promise<any> {
    return this.post(`http://localhost:8000/shop/orders/`, {
      items,
      isOrder,
      supId: supId,
      deliveryMethod: deliveryMethod
    });
  }
  getOrder(id: number) {
    return this.get(`http://localhost:8000/shop/orders/${id}/`, {})
  }

  getSuppliers(): Promise<ISuppliers[]> {
    return this.get(`http://localhost:8000/shop/suppliers/`, {})
  }

  getDeliveryMethod(): Promise<IDeliveryMethod[]> {
    return this.get(`http://localhost:8000/shop/deliverymethod/`, {})
  }

  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/shop/login/', {
      username: login,
      password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/shop/logout/', {
    });
  }

  signup(username: string, email: string, password: string): Promise<any> {
    return this.post('http://localhost:8000/shop/signup/', {
      username,
      email,
      password
    });
  }

}
