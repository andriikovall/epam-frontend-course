import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private baseUrl = environment.baseApiUrl +  'films';

  constructor(private http: HttpClient) { }

  getFilmById(id: string): Observable<Film> {
    return this.http.get<Film>(this.baseUrl + encodeURIComponent(id));
  }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.baseUrl);
  }
}
