import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TableService }  from '../table.service';
import { Table } from '../table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTable();
  }

  getTable(): void {
    const number = +this.route.snapshot.paramMap.get('number');
    this.tableService.getTables()
      .subscribe(tables => this.table = tables.find(table => table.number === number));
  }

}
