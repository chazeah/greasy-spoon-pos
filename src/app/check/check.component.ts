import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Check } from '../models/check';
import { CheckService } from '../check.service';
import { OrderedItem } from '../models/ordereditem';
import { OrderedItemService } from '../ordered-item.service';
import { MenuItem } from '../models/menuitem';
import { MenuItemService } from '../menu-item.service';
import { TableService } from '../table.service';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  check: Check;
  menuItems: MenuItem[];
  hasLoaded = false;
  orderingItem = false;

  constructor(
    private route: ActivatedRoute,
    private checkService: CheckService,
    private menuItemService: MenuItemService,
    private orderedItemService: OrderedItemService,
    private tableService: TableService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const getCheck = this.checkService.getCheck(id).then(check => this.check = check);
    const getItems = this.menuItemService.getMenuItems().then((items) => this.menuItems = items);
    Promise.all([getCheck, getItems]).then(() => this.hasLoaded = true);
  }

  orderItem(itemId: string) {
    this.orderingItem = true;
    this.checkService.addItemToCheck(itemId, this.check).then(orderedItem => {
      this.check.orderedItems.push(orderedItem);
      this.orderingItem = false;
    });
  }

  voidItem(orderedItem: OrderedItem) {
    const itemName = this.menuItemService.getName(orderedItem.itemId);
    const conf = confirm(`Are you sure you want to void ${itemName}?`);
    if (!conf) {
      return;
    }

    this.checkService.voidItemOnCheck(orderedItem, this.check).then(
      oi => {
        const index = this.check.orderedItems.findIndex((item) => item.id === oi.id);
        this.check.orderedItems[index] = oi;
      }
    );
  }

  closeCheck() {
    const conf = confirm('Are you sure you want to close this check?');
    if (!conf) {
      return;
    }

    this.checkService.markCheckAsClosed(this.check).then(
      check => {
        this.check = check;
        this.tableService.setCheckData$(check.tableId, this.check);
      }
    );
  }

  calcCheckTotal() {
    if (!this.check.orderedItems || this.check.orderedItems.length === 0) {
      return 0;
    }

    let total = this.check.orderedItems.reduce<number>((acc, cur) => {
      return acc + this.menuItemService.getPrice(cur.itemId);
    }, 0);
    total += (this.check.tax || 0) + (this.check.tip || 0);

    return total;
  }
}
