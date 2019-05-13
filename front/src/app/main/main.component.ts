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
  public signupname: any = '';
  public signuppassword: any = '';
  public username = '';
  public password = '';
  public email = '';
  public logged = false;
  public isStaff = false;

  // tslint:disable-next-line:max-line-length
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
  createProduct(itemName: string, itemDescription: string, buyingPrice: number, sellingPrice: number, category: number, image: ImageBitmap) {
    const product: IProduct = {id: null, itemName, itemDescription, buyingPrice, sellingPrice, category, image};
    this.provider.createProduct(product);
  }


  auth() {
    if (this.username !== '' && this.password !== '') {
      this.provider.auth(this.username, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isStaff = res.is_staff;
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
    if (this.signupname!== '' && this.email && this.signuppassword!== '') {
      this.provider.signup(this.signupname, this.email, this.signuppassword).then(res =>
        this.provider.auth(this.signupname, this.signuppassword).then(r => {
        localStorage.setItem('token', r.token);
        this.isStaff = r.is_staff;
        this.logged = true;
        this.loggedUsername = r.username;
        this.signupname = '';
        this.signuppassword = '';
        }));
    }
  }

}
