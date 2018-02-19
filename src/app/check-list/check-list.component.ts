import { Component, OnInit } from '@angular/core';

import { Check } from '../models/check';
import { CheckService } from '../check.service';
import { TableService } from '../table.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {
  allChecks: Check[] = [];
  finishedLoading = false;

  constructor(
    private checkService: CheckService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.checkService.getAllCheckData().then((checks) => {
      this.allChecks = checks;
      this.finishedLoading = true;
    });
  }
}
