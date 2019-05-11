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
  public username = '';
  public password = '';
  public email = '';
  public isStaff = false;
  public logged = false;
  public loggedUsername = '';//sdelat' tak chtob na backe vozrashalsya username, proverit', dovav'it otdelniye fieldy dlya regi i logina, nachat' vnedrenie orderov i shoppingcart
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getCategories().then(res => {
      this.categories = res;
    });
  }

  createCategory() {
    if (this.name !== '' && this.description !== '') {
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

  // tslint:disable-next-line:max-line-length
  createProduct(itemName: string, itemDescription: string, buyingPrice: number, sellingPrice: number, category: number, stock: number, image: ImageBitmap) {
    const product: IProduct = {id: null, itemName, itemDescription, buyingPrice, sellingPrice, category, stock, image};
    this.provider.createProduct(product);
  }


  auth() {
    if (this.username !== '' && this.password !== '') {
      this.provider.auth(this.username, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isStaff = res.isStaff;
        this.logged = true;
        this.loggedUsername = res.username;
        this.username = '';
        this.password = '';
        // this.provider.getCategories().then(r => {
        //   this.categories = r;
        // });
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.removeItem('token');
      this.logged = false;
    });
  }

  signup() {
    if (this.username !== '' && this.email && this.password !== '') {
      this.provider.signup(this.username, this.email, this.password).then(res =>
        this.provider.auth(this.username, this.password).then(r => {
        localStorage.setItem('token', r.token);
        this.isStaff = r.isStaff;
        this.logged = true;
        this.loggedUsername = r.username;
        this.username = '';
        this.password = '';
        }));
    }
  }

}
