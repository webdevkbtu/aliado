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
  constructor(private route: ActivatedRoute, private provider: ProviderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.params = params; setTimeout(() => {this.loading = true; }, 1000); });
    this.provider.getProduct(this.params.id).then(res => {this.product = res; });
  }

}
