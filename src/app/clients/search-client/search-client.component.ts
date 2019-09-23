import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Client } from '../../shared/client.model';
import { ClientService } from '../../shared/client.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.less']
})
export class SearchClientComponent implements OnInit {
  searchClientForm: FormGroup;
  hasResult = false;
  allClients: Client[] = [];
  foundClients: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.initForm();
    this.allClients = this.clientService.getClients();
  }

  initForm() {
    this.searchClientForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required])
    })
  }

  onClearSearch() {
    this.searchClientForm.reset();
    this.hasResult = false;
  }

  onSubmit() {
    let fullName = this.searchClientForm.value['fullName'];

    this.foundClients = this.clientService.searchClients(fullName)
    this.hasResult = true;
  }

  getClientIndex(client: Client) {
    return this.allClients.indexOf(client);
  }

}
