import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IOrder, IProduct} from '../shared/models/models';
import {of} from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public arrItems: IProduct[] = [];
  public selItems: IProduct[] = [];
  public orders: IOrder[] = [];
  public items: number[] = [];

  constructor(private provider: ProviderService) {
    this.provider.getAllProducts().then(res => this.arrItems = res);
  }

  ngOnInit() {
    this.provider.getOrders().then(res => {
      this.orders = res;
      this.selItems = [];
    });
  }

  createOrder() {
    this.selItems.forEach(item => this.items.push(item.id));
    this.provider.createOrder(this.items).then(res => this.provider.getOrders().then(r => this.orders = r));
  }

  select(product: IProduct) {
    this.selItems.push(product);
    this.arrItems = this.arrItems.filter(item => item !== product);
  }
  deselect(product: IProduct) {
    this.arrItems.push(product);
    this.selItems = this.selItems.filter(item => item !== product);
  }
}
