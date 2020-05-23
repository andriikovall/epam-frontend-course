import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public currentUser: BehaviorSubject<User>;
  public authLoading: BehaviorSubject<boolean>;

  public get isAuthenticated(): boolean {
    return !!(this.currentUser.getValue());
  }

  private usersBaseUrl = environment.baseApiUrl + 'users/';
  private cachedUsers = new Map<string, User>();

  constructor(private http: HttpClient) {
    super();
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

  public logout() {
    sessionStorage.removeItem('user');
    this.currentUser.next(null);
  }


  login(login: string, password: string): Observable<User> {
    this.authLoading.next(true);
    this.networkError.next(false);
    return this.http.get<User[]>(this.usersBaseUrl, { params: { login, password } })
      .pipe(
        catchError(err => {
          return of(null);
        }),
        map(users => users[0]),
        catchError(err => of(null)),
        tap(
          (user) => {
            this.saveUser(user);
            this.currentUser.next(user);
            this.authLoading.next(false);
            this.cachedUsers.set(user.id, user);
          },
        ),
      )
  }

  register(registrationValue): Observable<User> {
    this.authLoading.next(true);
    this.networkError.next(false);
    return this.getUserByLogin(registrationValue.login).pipe(
      switchMap((user) => {
        if (user)
          return of(null)

        return this.http.post<User>(this.usersBaseUrl, registrationValue)
          .pipe(
            catchError(err => of(null))
          )
      }),
      tap(
        (user) => {this.currentUser.next(user)},
        (user) => this.saveUser(user),
        () => this.authLoading.next(false),
      ),
      catchError((err) => {
        return of(null)
      }),
    );

  }

  getUserById(id: string): Observable<User> {
    if (this.cachedUsers.has(id)) {
      return of(this.cachedUsers.get(id));
    }
    return this.http.get<User>(this.usersBaseUrl + id)
      .pipe(
        tap(user => {
          if (user != null)
            this.cachedUsers.set(user.id, user);
        }),
      );
  }

  private getUserByLogin(login: string): Observable<User> {
    return this.http.get<User>(this.usersBaseUrl, { params: { login } })
      .pipe(
        tap(user => {
          if (user != null)
            this.cachedUsers.set(user.id, user);
        }),
        map(users => users[0] || null),
      );
  }

  onSocialAuth(user: User): Observable<User> {
    if (!user)
      return;

    this.saveUser(user);
    this.currentUser.next(user);
    return this.http.get<User>(this.usersBaseUrl + user.id).pipe(
      catchError(err => {
        return this.http.post<User>(this.usersBaseUrl, user);
      }),
      switchMap(user => {
        return this.http.put<User>(this.usersBaseUrl + user.id, user);
      }),
      tap(user => {
        if (user != null)
            this.cachedUsers.set(user.id, user);
      })
    )
  }



}
