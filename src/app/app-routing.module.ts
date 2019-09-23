import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { CarsComponent } from './cars/cars.component';
import { OrdersComponent } from './orders/orders.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { CarEditComponent } from './cars/car-edit/car-edit.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { OrderListComponent } from './orders/order-list/order-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/new', component: ClientEditComponent },
  { path: 'clients/:clientId/edit', component: ClientEditComponent },
  { path: 'clients/:clientId/cars', component: CarsComponent, children: [
      { path: '', component: CarListComponent },
      { path: 'new', component: CarEditComponent },
      { path: ':carId/edit', component: CarEditComponent }
  ] },
  { path: 'clients/:clientId/cars/:carId/orders', component: OrdersComponent, children: [
      { path: '', component: OrderListComponent },
      { path: 'new', component: OrderEditComponent },
      { path: ':orderId/edit', component: OrderEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}