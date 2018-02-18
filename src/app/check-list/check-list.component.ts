import { Component, OnInit } from '@angular/core';

import { Check } from '../models/check';
import { CheckService } from '../check.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {
  allChecks: Check[] = [];

  constructor(
    private checkService: CheckService
  ) { }

  ngOnInit() {
    this.checkService.getAllCheckData().then((checks) => this.allChecks = checks);
  }

}
