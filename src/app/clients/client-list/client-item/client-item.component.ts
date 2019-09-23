import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Client} from '../../../shared/client.model';

@Component({
  selector: '[app-client-item]',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.less']
})
export class ClientItemComponent implements OnInit {
  @Input() client: Client;
  @Input() index: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onEditClient() {
    let path = this.index + '/edit';
    this.router.navigate([path], { relativeTo: this.route });
  }

  onViewCars() {
    let path = this.index + '/cars';
    this.router.navigate([path], { relativeTo: this.route });
  }

}
