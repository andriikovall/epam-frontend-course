import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private salt: string = 'some_salt';

  private usersBaseUrl = environment.baseApiUrl +  'users/';

  public currentUser: BehaviorSubject<User>;
  public authLoading: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.loadUser();
  }

  private loadUser() {
    const rawUser = sessionStorage.getItem('user');
    this.authLoading = new BehaviorSubject<boolean>(true);
    this.currentUser = new BehaviorSubject<User>(null);
    try {
      const user = JSON.parse(rawUser);
      this.currentUser.next(user);
    } catch (err) {
      this.currentUser.next(null);
    }
    this.authLoading.next(false);
  }

  private saveUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // private hashFunc(string: string) {
  //   return string;
  // }

  login(login: string, password: string): Promise<User> {
    this.authLoading.next(true);
    return this.httpClient.get<User[]>(this.usersBaseUrl, { params: { login, password }})
      .pipe(
        map(users => users[0]),
        catchError(err => of(null)),
        tap(
          (user) => this.saveUser(user),
          (user) => this.currentUser.next(user),
          () => this.authLoading.next(false)
        ),
      ).toPromise()
  }

  register(registrationValue): Promise<User> {
    this.authLoading.next(true);
    return this.getUserByLogin(registrationValue.login).pipe(
      switchMap((user) => {
        if (user)
          return of(null)

        return this.httpClient.post<User>(this.usersBaseUrl, registrationValue)
          .pipe(
            tap(
              (user) => this.saveUser(user),
              (user) => this.currentUser.next(user),
            ),
            catchError(err => of(null))
          )
      }),
      tap(
        () => this.authLoading.next(false)
      )
    ).toPromise();

  }

  private getUserByLogin(login: string): Observable<User> {
    return this.httpClient.get<User>(this.usersBaseUrl, { params: { login }})
      .pipe(
        map(users => users[0] || null)
      );
  }

  onSocialAuth(user: User): Promise<User> {
    if (!user)
      return;

    this.saveUser(user);
    this.currentUser.next(user);
    return this.httpClient.post<User>(this.usersBaseUrl, user)
      .pipe(
        catchError(err => this.httpClient.put<User>(this.usersBaseUrl + user.id, user))
      ).toPromise();
  }



}
