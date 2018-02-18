import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { Table } from './models/table';

@Injectable()
export class TableService {
  private tablesUrl = 'https://check-api.herokuapp.com/tables';
  private tables: Promise<Table[]>;

  constructor(
    private http: HttpClient
  ) {}

  getTables(): Promise<Table[]> {
    if (this.tables) {
      return this.tables;
    } else {
      this.tables = this.http.get<Table[]>(this.tablesUrl).toPromise();
      return this.tables;
    }
  }
}
