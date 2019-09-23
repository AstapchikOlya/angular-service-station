import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from '../../shared/client.service';
import { Client } from '../../shared/client.model';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.less']
})
export class ClientEditComponent implements OnInit {
  clientId: number;
  editMode = false;
  @Input() pageTitle = 'Add New Client';
  @Input() submitBtnTitle = 'Add';
  newClientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
          this.editMode = params['clientId'] != null;
          this.initForm();
        }
      );
  }

  initForm() {
    let clientFirstName = '';
    let clientLastName = '';
    let clientBirthDate = '';
    let clientAddress = '';
    let clientPhone = '';
    let clientEmail = '';

    if (this.editMode) {
      const client = this.clientService.getClient(this.clientId);
      clientFirstName = client.firstName;
      clientLastName = client.lastName;
      clientBirthDate = client.birthDate;
      clientAddress = client.address;
      clientPhone = client.phone;
      clientEmail = client.email;
      this.pageTitle = 'Edit Client';
      this.submitBtnTitle = 'Update';
    }

    this.newClientForm = new FormGroup({
      'firstName': new FormControl(clientFirstName, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      'lastName': new FormControl(clientLastName, [Validators.required,Validators.pattern('[a-zA-Z]*')]),
      'birthDate': new FormControl(clientBirthDate, [Validators.required, Validators.pattern('(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/][0-9]{4}')]),
      'address': new FormControl(clientAddress, [Validators.required]),
      'phone': new FormControl(clientPhone, [Validators.required, Validators.pattern('([\+]375) [(][0-9]{2}[)] [0-9]{3} [0-9]{2} [0-9]{2}')]),
      'email': new FormControl(clientEmail, [Validators.required, Validators.email])
    });

  }

  onSubmit() {
    const newClient = new Client(
      this.newClientForm.value['firstName'],
      this.newClientForm.value['lastName'],
      this.newClientForm.value['birthDate'],
      this.newClientForm.value['address'],
      this.newClientForm.value['phone'],
      this.newClientForm.value['email'],
      []);

    if (this.editMode) {
      this.clientService.updateClient(this.clientId, newClient);
    } else {
      this.clientService.addClient(newClient);
    }

    this.onBackToClients();
  }

  onBackToClients() {
    this.router.navigate(['/clients']);
  }

}
