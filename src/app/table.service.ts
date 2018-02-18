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
        tables.forEach((table) => {
          let subject$ = new Subject();
          subject$.next(table);
          this.tablesObs$[table.id] = subject$;
        })
      });
      return this.tables;
    }
  }

  getCheckData$(table: Table) {
    return this.tablesObs$[table.id];
  }

  setCheckData$(tableId: string, check: Check) {
    let subject$ = this.tablesObs$[tableId];
    subject$.next(check);
  }
}
