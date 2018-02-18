import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { OrderedItem } from './models/ordereditem';

@Injectable()
export class OrderedItemService {
  constructor() { }
}
