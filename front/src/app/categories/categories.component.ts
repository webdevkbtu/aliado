import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ICategory, IProduct} from '../shared/models/models';
import {ProviderService} from '../shared/services/provider.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public category: ICategory = null;
  public params: any;
  public products: IProduct[] = [];
  public loading = false;
  constructor(private route: ActivatedRoute, private provider: ProviderService, private router: Router) {
    route.params.subscribe(value => {
      this.params = value; setTimeout(() => {this.loading = true; }, 1000);
      console.log('KEK');
      this.provider.getCategory(this.params.id).then(res => {this.category = res;
        console.log('KEK');
        this.provider.getProducts(this.category).then(r => {this.products = r;
        console.log('KEK'); }); }); });
  }

  ngOnInit() {
    this.provider.getCategory(this.params.id).then(res => {this.category = res;
                                                           this.provider.getProducts(this.category).then(r => this.products = r); });
  }


}
