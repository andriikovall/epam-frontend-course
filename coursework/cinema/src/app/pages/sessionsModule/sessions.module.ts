import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions/sessions.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SessionsComponent],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    SharedModule
  ]
})
export class SessionsModule { }
