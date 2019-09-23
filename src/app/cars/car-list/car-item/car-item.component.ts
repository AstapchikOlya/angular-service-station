import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../../shared/car.model';
import { ClientService } from '../../../shared/client.service';

@Component({
  selector: '[app-car-item]',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.less']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  @Input() index: number;
  clientId: number;
  hasOrders = false;

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
        }
      );

    this.hasOrders = this.clientService.hasCarAnyOrders(this.clientId, this.index);
  }

  onEditCar() {
    let path = this.index + '/edit';
    this.router.navigate([path], { relativeTo: this.route });
  }

  onViewOrders() {
    let path = this.index + '/orders';
    this.router.navigate([path], { relativeTo: this.route });
  }

  onRemoveCar() {
    this.clientService.removeClientCar(this.clientId, this.index);
  }

}
