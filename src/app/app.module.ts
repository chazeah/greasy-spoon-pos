import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableComponent } from './table/table.component';
import { TableService } from './table.service';
import { CheckService } from './check.service';
import { OrderedItemService } from './ordered-item.service';
import { MenuItemService } from './menu-item.service';
import { AppRoutingModule } from './app-routing.module';
import { ApiAuthInterceptor } from  './api-auth';
import { CheckComponent } from './check/check.component';


@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    TableComponent,
    CheckComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiAuthInterceptor,
      multi: true
    },
    CheckService,
    MenuItemService,
    OrderedItemService,
    TableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
