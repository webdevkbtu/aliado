import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProviderService} from '../shared/services/provider.service';
import {IProduct} from '../shared/models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public params: any;
  public loading = false;
  public product: IProduct;
  public items: Array<any> = [];
  constructor(private route: ActivatedRoute, private provider: ProviderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.params = params; setTimeout(() => {this.loading = true; }, 1000); });
    this.provider.getProduct(this.params.id).then(res => {this.product = res; });
  }

  addToCart(product: IProduct) {
    if (localStorage.getItem('cart') !== null) {
      this.items = JSON.parse(localStorage.getItem('cart'));
    }
    if (!this.items.includes(JSON.stringify(product.id))){
      this.items.push(JSON.stringify(product.id));
      console.log(this.items)
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

}
