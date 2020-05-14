import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { GoogleAuthComponent } from '../../google-auth/google-auth.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, GoogleAuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule { }
