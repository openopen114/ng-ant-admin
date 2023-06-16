import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DwRoutingModule } from './dw-routing.module';
import { DWMSGDWMSGComponent } from './dwmsgdwmsg/dwmsgdwmsg.component';


@NgModule({
  declarations: [
    DWMSGDWMSGComponent
  ],
  imports: [
    CommonModule,
    DwRoutingModule
  ]
})
export class DwModule { }
