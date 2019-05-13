import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {of} from "rxjs";
import {IDeliveryMethod, IProduct} from "../shared/models/models";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart: Array<any> = [];
  public items: number[] = [];
  public products: IProduct[] = [];
  public cost: number = 0;
  public deliverymethods: IDeliveryMethod[] = [];
  public deliverymethod: number = 1;

  constructor(private provider: ProviderService) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.forEach(item=>this.provider.getProduct(parseInt(item)).then(res => {this.products.push(res);this.cost += res.sellingPrice}))
    this.provider.getDeliveryMethod().then(res => this.deliverymethods = res);
  }

  ngOnInit() {
    console.log(this.cart)
  }
  //sdelat' trigger kotoriy sozdaet shopping cart kogda sozdaetsya user, propisat' crud
  buy() {
    this.cart.forEach(item => this.items.push(parseInt(item)));
    this.provider.createOrder(this.items, false, null, null).then(res=>{this.cart = []; localStorage.setItem('cart', JSON.stringify(this.cart)); this.cost = 0; this.products = [];});
  }


}
