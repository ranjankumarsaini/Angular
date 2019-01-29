import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoutingComponent } from './routing/routing.component';
import { RouterModule} from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataService } from './shared/service.helper';
import { BaseService } from './shared/base.service';
import { BaseApiClass } from './shared/api.base';
import { HttpModule } from '@angular/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,NgxDatatableModule,HttpModule,ModalModule.forRoot(),
    RouterModule.forRoot([
      {
         path: 'new-cmp',
         component: RoutingComponent
      }
   ])
  ],
  providers: [DataService,BaseService,BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
