import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableListComponent } from './table-list/table-list.component';
import { TableComponent } from './table/table.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  { path: 'check/:id', component: CheckComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
