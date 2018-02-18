import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { Table } from './models/table';
import { Check } from './models/check';

@Injectable()
export class CheckService {
  private checksUrl = 'https://check-api.herokuapp.com/checks';
  private initialCheckData: Promise<Check[]>;

  constructor(
    private http: HttpClient
  ) {
    this.getInitialTableChecks();
  }

  createCheck(table: Table): Promise<Check> {
    return this.http.post<Check>(
      this.checksUrl,
      {
        "tableId": table.id
      }
    ).toPromise();
  }

  getInitialTableChecks() {
    this.initialCheckData = this.http.get<Check[]>(this.checksUrl).toPromise();
  }

  getInitialCheck(table: Table): Promise<Check> {
    return this.initialCheckData.then((checks) => {
      return checks.find((check) => check.tableId === table.id)
    })
  }

  getCheck(id: string): Promise<Check> {
    return this.http.get<Check>(this.checksUrl + `/${id}`).toPromise();
  }
}
