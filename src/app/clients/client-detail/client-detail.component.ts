import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../shared/client.service';
import { Client } from '../../shared/client.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.less']
})
export class ClientDetailComponent implements OnInit {
  clientId: number;
  client: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.clientId = +params['clientId'];
          this.client = this.clientService.getClient(this.clientId);
        }
      );
  }

}
