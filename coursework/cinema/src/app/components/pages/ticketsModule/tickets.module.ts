import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketComponent } from '../../ticket/ticket.component';


@NgModule({
  declarations: [TicketsComponent, TicketComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule,
    QRCodeModule
  ]
})
export class TicketsModule { }
