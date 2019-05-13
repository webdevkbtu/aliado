import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IDeliveryMethod, IOrder, IProduct, ISuppliers} from '../shared/models/models';
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
  public suppliers: ISuppliers[] = [];
  public deliverymethods: IDeliveryMethod[] = [];
  public supplier: number = 1;
  public deliverymethod: number = 1;
  public filterid: number;

  constructor(private provider: ProviderService) {
    this.provider.getAllProducts().then(res => this.arrItems = res);
    this.provider.getSuppliers().then(res => this.suppliers = res);
    this.provider.getDeliveryMethod().then(res => this.deliverymethods = res);
  }

  ngOnInit() {
    this.provider.getOrders().then(res => {
      res.forEach(item=>this.orders.push(item));
      this.selItems = [];
    });
  }

  createOrder() {
    this.selItems.forEach(item => this.items.push(item.id));
    console.log(this.supplier);
    console.log(this.deliverymethod);
    this.provider.createOrder(this.items, true, this.supplier, this.deliverymethod).then(res => this.provider.getOrders().then(r => this.orders = r));
  }

  select(product: IProduct) {
    this.selItems.push(product);
    this.arrItems = this.arrItems.filter(item => item !== product);
  }
  deselect(product: IProduct) {
    this.arrItems.push(product);
    this.selItems = this.selItems.filter(item => item !== product);
  }

  filter(id: number){
    this.provider.getOrder(id).then(res => {this.orders = []; this.orders.push(res)})
  }
}
