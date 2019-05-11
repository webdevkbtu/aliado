import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart: any = [];
  constructor(private provider: ProviderService) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  ngOnInit() {

  }
  //sdelat' trigger kotoriy sozdaet shopping cart kogda sozdaetsya user, propisat' crud
  buy() {

  }

}
