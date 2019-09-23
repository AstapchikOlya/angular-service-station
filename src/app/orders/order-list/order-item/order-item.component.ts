import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Order } from '../../../shared/order.model';
import { ClientService } from '../../../shared/client.service';

@Component({
  selector: '[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.less']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Input() index: number;
  statusClass: string;
  clientId: number;
  carId: number;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
          this.carId = +params['carId'];
        }
      );

    switch (this.order.orderStatus) {
      case 'In Progress': {
        this.statusClass = 'bg-info';
        break;
      }
      case 'Completed': {
        this.statusClass = 'bg-success';
        break;
      }
      case 'Cancelled': {
        this.statusClass = 'bg-danger';
        break;
      }
      default: {
        this.statusClass = 'bg-info';
        break;
      }
    }
  }

  onEditOrder() {
    let path = this.index + '/edit';
    this.router.navigate([path], { relativeTo: this.route });
  }

  onRemoveOrder() {
    this.clientService.removeCarOrder(this.clientId, this.carId, this.index);
  }

}
