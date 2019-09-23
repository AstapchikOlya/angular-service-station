import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from '../../shared/client.service';
import { Order } from '../../shared/order.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.less']
})
export class OrderEditComponent implements OnInit {
  statuses = ['Completed', 'In Progress', 'Cancelled'];
  clientId: number;
  carId: number;
  orderId: number;
  editMode = false;
  @Input() pageTitle = 'Add New Order';
  @Input() submitBtnTitle = 'Add';
  newOrderForm: FormGroup;

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
          this.carId = +params['carId'];
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.orderId = +params['orderId'];
          this.editMode = params['orderId'] != null;
          this.initForm();
        }
      )
  }

  initForm() {
    let orderDate = '';
    let orderAmount = null;
    let orderStatus = 'In Progress';

    if (this.editMode) {
      const order = this.clientService.getOrder(this.clientId, this.carId, this.orderId);
      orderDate = order.date;
      orderAmount = order.orderAmount;
      orderStatus = order.orderStatus;
      this.pageTitle = 'Edit Order';
      this.submitBtnTitle = 'Update';
    }

    this.newOrderForm = new FormGroup({
      'date': new FormControl(orderDate, [Validators.required, Validators.pattern('(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/][0-9]{4}')]),
      'amount': new FormControl(orderAmount, [Validators.required, Validators.min(0), Validators.max(10000)]),
      'status': new FormControl(orderStatus, [Validators.required])
    });
  }

  onBackToOrders() {
    let redirectPath = '../';

    if (this.editMode) {
      redirectPath = '../../';
    }

    this.router.navigate([redirectPath], { relativeTo: this.route });
  }

  onSubmit() {
    const newOrder = new Order(
      this.newOrderForm.value['date'],
      this.newOrderForm.value['amount'],
      this.newOrderForm.value['status']
    );

    if (this.editMode) {
      this.clientService.updateOrder(this.clientId, this.carId, this.orderId, newOrder);
    } else {
      this.clientService.addOrder(this.clientId, this.carId, newOrder);
    }

    this.onBackToOrders();
  }

}
