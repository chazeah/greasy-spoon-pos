import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, single } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Table } from './table';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmYmI1ZTE4LWVkMDktNDM0OS1hZDVmLWQ5ZDFiODNmYTExNCIsIm5hbWUiOiJDaGFybGV5IFdhbHRvbiJ9.UpaoaNWB5NViuM3FGN5qLcIFV5sI5gUODMNLemluJOY'
  })
};

@Injectable()
export class TableService {
  private tablesUrl = 'https://check-api.herokuapp.com/tables';

  constructor(
    private http: HttpClient
  ) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.tablesUrl, httpOptions);
    //return of(this.tables);
  }
}
