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
  hasLoaded = false;

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
    const getMenuItems = this.menuItemService.getMenuItems();
    Promise.all([getCheck, getMenuItems]).then(() => this.hasLoaded = true);
  }

  orderItem(itemId: string) {
    this.checkService.addItemToCheck(itemId, this.check).then(
      orderedItem => this.check.orderedItems.push(orderedItem)
    );
  }

  voidItem(orderedItem: OrderedItem) {
    this.checkService.voidItemOnCheck(orderedItem, this.check).then(
      oi => {
        const index = this.check.orderedItems.findIndex((item) => item.id === oi.id);
        this.check.orderedItems[index] = oi;
      }
    );
  }

  closeCheck() {
    this.checkService.markCheckAsClosed(this.check).then(
      check => {
        this.check = check;
        this.tableService.setCheckData$(check.tableId, this.check);
      }
    );
  }
}
