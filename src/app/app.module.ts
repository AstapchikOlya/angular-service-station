import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientItemComponent } from './clients/client-list/client-item/client-item.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderItemComponent } from './orders/order-list/order-item/order-item.component';
import { CarsComponent } from './cars/cars.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarItemComponent } from './cars/car-list/car-item/car-item.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { CarEditComponent } from './cars/car-edit/car-edit.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientService } from './shared/client.service';
import { SearchClientComponent } from './clients/search-client/search-client.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientItemComponent,
    OrdersComponent,
    OrderListComponent,
    OrderItemComponent,
    CarsComponent,
    CarListComponent,
    CarItemComponent,
    CarDetailComponent,
    CarEditComponent,
    OrderEditComponent,
    ClientEditComponent,
    SearchClientComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
