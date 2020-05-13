import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmsService extends BaseService {
  private baseUrl = environment.baseApiUrl +  'films/';

  private cachedFilms = new Map<string, Film>();

  constructor(private http: HttpClient) {
    super();
  }

  cacheFilm(film: Film) {
    this.cachedFilms.set(film.id, film);
  }

  getFilmById(id: string): Observable<Film> {
    this.networkError.next(false);
    if (this.cachedFilms.has(id)) {
      return of (this.cachedFilms.get(id));
    }
    return this.http.get<Film>(this.baseUrl + encodeURIComponent(id)).pipe(
      tap(film => this.cacheFilm(film)),
      catchError(err => {
        this.networkError.next(true);
        return of(null);
      })
    );
  }

  getFilms(): Observable<Film[]> {
    this.networkError.next(false);
    return this.http.get<Film[]>(this.baseUrl).pipe(
      tap(films => films.forEach((f) => this.cacheFilm(f))),
      catchError(err => {
        console.log('err:', err)
        this.networkError.next(true);
        return of(null);
      })
    );
  }

  getNewestFilms(count: number = 5): Observable<Film[]> {
    console.log('getNewestFilms:)');
    return this.getFilms().pipe(
      map(films => films.sort((f1, f2) => f2.date > f1.date ? 1 : -1)),
      map(films => films.slice(0, count))
    )
  }
}
