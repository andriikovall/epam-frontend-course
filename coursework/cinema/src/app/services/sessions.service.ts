import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionDTO, Session } from '../models/session';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Observable, from, of } from 'rxjs';
import { FilmsService } from './films.service';
import { RoomsService } from './rooms.service';
import { Film } from '../models/film';
import { Room } from '../models/room';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends BaseService {

  private baseUrl = environment.baseApiUrl +  'sessions/';

  constructor(private http: HttpClient,
              private filmService: FilmsService,
              private roomService: RoomsService) {
    super();
  }

  getAllSessions(): Observable<Session[]> {
    return from(this.getAllSessionsHelper()).pipe(
      catchError(err => {
        console.log('err:', err);
        this.networkError.next(true);
        return of(null);
      })
    );
  }

  private async getAllSessionsHelper(): Promise<Session[]> {
    const sessionsDTO = await this.http.get<SessionDTO[]>(this.baseUrl).toPromise();
    await Promise.all([
      await this.roomService.cacheRooms().toPromise(),
      await this.filmService.cacheFilms().toPromise()
    ]);

    const promises: Promise<[Film, Room]>[] = sessionsDTO.map(s => Promise.all([
      this.filmService.getFilmById(s.filmId).toPromise(),
      this.roomService.getRoomById(s.roomId).toPromise()
    ]));

    const sessions: Session[] = [];

    let i = 0;
    for await (const [film, room] of promises) {
      sessions.push({ ...sessionsDTO[i++], film, room });
    }
    return sessions;
  }
}
