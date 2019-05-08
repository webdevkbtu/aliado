import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';
import {ICategory, IProduct} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getCategories(): Promise<ICategory[]> {
    return this.get('http://localhost:8000/shop/categories/', {});
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

  getProducts(category: ICategory) {
    return this.get(`http://localhost:8000/shop/categories/${category.id}/products/`, {});
  }

  createProduct(product: IProduct) {
    return this.post(`http://localhost:8000/shop/categories/${product.category}/products/`, {
      itemName: product.itemName,
      itemDescription: product.itemDescription,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      categoryID: product.category,
      stock: product.stock
    });
  }
}
