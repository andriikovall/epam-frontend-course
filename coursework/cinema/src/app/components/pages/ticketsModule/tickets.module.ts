import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule
  ]
})
export class TicketsModule { }
