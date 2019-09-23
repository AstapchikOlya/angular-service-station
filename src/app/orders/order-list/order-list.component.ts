import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import  {Order } from '../../shared/order.model';
import { ClientService } from '../../shared/client.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit {
  clientId: number;
  carId: number;
  orders: Order[];

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
          this.carId = +params['carId'];

          console.log(this.carId);
          this.orders = this.clientService.getCarOrders(this.clientId, this.carId);
        }
      );
  }

  onNewOrder() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onGoBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
