import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableListComponent } from './table-list/table-list.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', redirectTo: '/tables', pathMatch: 'full' },
  { path: 'tables', component: TableListComponent },
  { path: 'table/:number', component: TableComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
