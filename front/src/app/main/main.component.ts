import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {ICategory, IProduct} from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public categories: ICategory[] = [];
  public products: IProduct[] = [];
  public name: any = '';
  public description: any = '';
  public itemName = '';
  public itemDesc = '';
  public bPrice = '';
  public sPrice = '';
  public category = '';
  public stock = '';
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getCategories().then(res => {
      this.categories = res;
    });
  }

  createCategory() {
    if (this.name !== '' && this.description !== ''){
      this.provider.createCategory(this.name, this.description).then(res => {
        this.name = '';
        this.categories.push(res);
      });
    }
  }

  updateCategory(category: ICategory) {
    this.provider.updateCategory(category).then(res => {
      console.log(category.categoryName + 'updated');
    });
  }

  deleteCategory(category: ICategory) {
    this.provider.deleteCategory(category.id).then(res => {
      console.log(category.categoryName + 'deleted');
      this.provider.getCategories().then(r => {
        this.categories = r;
      });
    });
  }

  getProducts(category: ICategory) {
    this.provider.getProducts(category).then(res => {
      this.products = res;
    });
  }

  createProduct(itemName: string, itemDescription: string, buyingPrice: number, sellingPrice: number, category: number, stock: number) {
    const product: IProduct = {id: null, itemName, itemDescription, buyingPrice, sellingPrice, category, stock};
    this.provider.createProduct(product);
  }

}
