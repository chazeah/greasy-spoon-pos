import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { Table } from './models/table';
import { Check } from './models/check';

@Injectable()
export class TableService {
  private tablesUrl = 'https://check-api.herokuapp.com/tables';
  private tables: Promise<Table[]>;
  private tableObjs: Table[];
  // The typedef here is complex: {string: Subject<Table>[]}
  // Ignoring it for now.
  private tablesObs$: any = {};

  constructor(
    private http: HttpClient
  ) {}

  getTables(): Promise<Table[]> {
    if (this.tables) {
      return this.tables;
    } else {
      this.tables = this.http.get<Table[]>(this.tablesUrl).toPromise();
      this.tables.then((tables) => {
        this.tableObjs = tables;
        tables.forEach((table) => {
          const subject$ = new Subject();
          subject$.next(table);
          this.tablesObs$[table.id] = subject$;
        });
      });
      return this.tables;
    }
  }

  getCheckData$(table: Table) {
    return this.tablesObs$[table.id];
  }

  setCheckData$(tableId: string, check: Check) {
    const subject$ = this.tablesObs$[tableId];
    subject$.next(check);
  }

  getNumber(tableId: string) {
    const item = this.tableObjs.find(i => i.id === tableId);
    return item ? item.number : '';
  }
}
