import { Component, OnInit } from '@angular/core';

import { Table } from '../models/table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getTables().then(
      tables => this.tables = tables
    );
  }
}
