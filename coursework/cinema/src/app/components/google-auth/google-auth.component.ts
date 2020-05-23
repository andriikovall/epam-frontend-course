/// <reference path="../../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../../node_modules/@types/gapi.auth2/index.d.ts" />

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

  gapiSetup: boolean;
  authInstance: gapi.auth2.GoogleAuth;
  user: gapi.auth2.GoogleUser;
  error: any;

  @Output() userAuthenticated: EventEmitter<User> = new EventEmitter<User>();


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  async initGoogleAuth(): Promise<void> {
    this.authService.authLoading.next(true);
    return new Promise((resolve) => {
      gapi.load('auth2', async () => {
        await gapi.auth2
          .init({ client_id: environment.GOOGLE_OUAUTH_CLIENT_ID })
          .then(auth => {
            this.gapiSetup = true;
            this.authInstance = auth;
            resolve();
          });
      });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    try {
      const user: gapi.auth2.GoogleUser = await this.authInstance.signIn();
      return user;
    } catch (err) {
      this.error = err;
    }
  }

  onAuthClicked() {
    this.authenticate()
      .then(user => {
        const defaultUserModel: User = this.mapGoogleUserToDefaultModel(user);
        this.userAuthenticated.emit(defaultUserModel);
      })
      .catch(err => {
        this.userAuthenticated.emit(null);
      })
      .then(() => {
        this.authService.authLoading.next(false);
      });
  }

  mapGoogleUserToDefaultModel(user: gapi.auth2.GoogleUser): User {
    const [ firstName, lastName ] = user.getBasicProfile().getName().split(' ');
    return {
      firstName,
      lastName,
      avaUrl: user.getBasicProfile().getImageUrl(),
      id: user.getBasicProfile().getId(),
    } as User;
  }

}
