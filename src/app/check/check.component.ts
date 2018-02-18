import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Check } from '../models/check';
import { CheckService }  from '../check.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  check: Check;

  constructor(
    private route: ActivatedRoute,
    private checkService: CheckService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.checkService.getCheck(id).then(check => this.check = check);
  }

}
