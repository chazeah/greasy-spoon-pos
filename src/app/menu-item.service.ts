import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { MenuItem } from './models/menuitem';

@Injectable()
export class MenuItemService {
  private menuItemsUrl = 'https://check-api.herokuapp.com/items';
  private menuItems: Promise<MenuItem[]>;
  private items: MenuItem[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.getMenuItems();
  }

  getMenuItems() {
    if (this.menuItems) {
      return this.menuItems;
    } else {
      this.menuItems = this.http.get<MenuItem[]>(this.menuItemsUrl).toPromise();
      this.menuItems.then(items => this.items = items);
      return this.menuItems;
    }
  }

  getName(itemId: string) {
    let item = this.items.find(item => item.id === itemId);
    return item ? item.name : '';
  }

}
