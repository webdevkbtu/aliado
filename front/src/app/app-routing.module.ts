import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {OrdersComponent} from './orders/orders.component';
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path: 'categories/:id', component: CategoriesComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
