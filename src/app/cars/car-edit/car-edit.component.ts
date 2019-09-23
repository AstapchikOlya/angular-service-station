import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from '../../shared/client.service';
import { Car } from '../../shared/car.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.less']
})
export class CarEditComponent implements OnInit {
  clientId: number;
  carId: number;
  editMode = false;
  @Input() pageTitle = 'Add New Car';
  @Input() submitBtnTitle = 'Add';
  years: number[];
  newCarForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.carId = +params['carId'];
          this.editMode = params['carId'] != null;
          this.initForm();
        }
      );
  }

  generateYearsRange(rangeFrom, rangeTo) {
    let range = [];

    for (let i = rangeTo; i >= rangeFrom; i--) {
      range.push(i);
    }

    return range;
  }

  initForm() {
    let carMake = '';
    let carModel = '';
    let carYear = 2019;
    let carVIN = '';

    if (this.editMode) {
      const car = this.clientService.getCar(this.clientId, this.carId);
      carMake = car.make;
      carModel = car.model;
      carYear = car.year;
      carVIN = car.vin;
      this.pageTitle = 'Edit Car';
      this.submitBtnTitle = 'Update';
    }

    this.years = this.generateYearsRange(1900, 2019);

    this.newCarForm = new FormGroup({
      'make': new FormControl(carMake, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      'model': new FormControl(carModel, [Validators.required]),
      'year': new FormControl(carYear, [Validators.required]),
      'vin': new FormControl(carVIN, [Validators.required, Validators.pattern('[0-9A-Z]{17}')])
    });
  }

  onBackToCars() {
    let redirectPath = '../';

    if (this.editMode) {
      redirectPath = '../../';
    }

    this.router.navigate([redirectPath], { relativeTo: this.route });
  }

  onSubmit() {
    const newCar = new Car(
      this.newCarForm.value['make'],
      this.newCarForm.value['model'],
      this.newCarForm.value['year'],
      this.newCarForm.value['vin'],
      []);

    if (this.editMode) {
      this.clientService.updateCar(this.clientId, this.carId, newCar);
    } else {
      this.clientService.addCar(this.clientId, newCar);
    }

    this.onBackToCars();
  }

}
