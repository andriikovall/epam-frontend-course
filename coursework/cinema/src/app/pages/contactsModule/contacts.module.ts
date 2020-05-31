import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
  ]
})
export class ContactsModule { }
