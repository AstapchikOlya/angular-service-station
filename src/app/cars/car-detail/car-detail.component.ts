import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../shared/client.service';
import { Car } from '../../shared/car.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.less']
})
export class CarDetailComponent implements OnInit {
  clientId: number;
  carId: number;
  car: Car;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
          this.carId = +params['carId'];
          this.car = this.clientService.getCar(this.clientId, this.carId);
        }
      );
  }

}
