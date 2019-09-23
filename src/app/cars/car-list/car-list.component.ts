import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../shared/car.model';
import { ClientService } from '../../shared/client.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.less']
})
export class CarListComponent implements OnInit {
  clientId: number;
  cars: Car[];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
          this.cars = this.clientService.getClientCars(this.clientId);
        }
      );
  }

  onNewCar() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
