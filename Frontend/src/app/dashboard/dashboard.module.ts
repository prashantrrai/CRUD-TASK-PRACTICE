import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdduserComponent } from './adduser/adduser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';


@NgModule({
  declarations: [
    AdduserComponent,
    UpdateuserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
