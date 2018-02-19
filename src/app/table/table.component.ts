import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Check } from '../models/check';
import { CheckService } from '../check.service';
import { Table } from '../models/table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table;
  check: Check;
  creatingCheck = false;

  constructor(
    private route: ActivatedRoute,
    private checkService: CheckService,
    private tableService: TableService,
    private location: Location
  ) { }

  ngOnInit() {
    this.checkService.getInitialCheck(this.table).then((check) => {
      if (check) {
        this.check = check;
        this.tableService.setCheckData$(this.table.id, this.check);
      }
    });

    this.tableService.getCheckData$(this.table).subscribe(check => {
      this.check = check.closed ? undefined : check;
    });
  }

  onCreateCheck() {
    this.creatingCheck = true;
    this.checkService.createCheck(this.table).then(check => {
      this.check = check;
      this.creatingCheck = false;
    });
  }
}
