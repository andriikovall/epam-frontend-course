import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionDTO, Session } from '../models/session';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Observable, from, of, throwError, combineLatest, BehaviorSubject } from 'rxjs';
import { FilmsService } from './films.service';
import { RoomsService } from './rooms.service';
import { Film } from '../models/film';
import { Room } from '../models/room';
import { catchError, map, tap } from 'rxjs/operators';
import { Ticket } from '../models/ticket';
import { TicketsService } from './tickets.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends BaseService {

  public sessionUpdating: BehaviorSubject<boolean>;

  private baseUrl = environment.baseApiUrl +  'sessions/';

  private sessions: Session[] = [];

  constructor(private http: HttpClient,
              private filmService: FilmsService,
              private roomService: RoomsService,
              private ticketsService: TicketsService) {
    super();

    this.sessionUpdating = new BehaviorSubject<boolean>(false);
  }

  getAllSessions(): Observable<Session[]> {
    if (this.sessions.length) {
      return of(this.sessions);
    }
    return from(this.getAllSessionsHelper()).pipe(
      tap(sessions => this.sessions = sessions),
      catchError(err => {
        return of(null);
      })
    );
  }

  getFilmSessions(filmId: string): Observable<Session[]> {
    return this.getAllSessions().pipe(
      map(sessions => sessions.filter(s => s.film.id == filmId))
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

  updateSessionWithTicket(session: Session, ticket: Ticket): Observable<Ticket> {
    this.sessionUpdating.next(true);
    if (ticket.row < session.sittings.length &&
        ticket.col < session.sittings[0].length) {

        session.sittings[ticket.row][ticket.col] = 1;

        return combineLatest([
          this.http.patch(this.baseUrl + session.id, this.mapSessionToDTO(session)),
          this.ticketsService.inserTicket(ticket)
        ]).pipe(
          map(([ , ticket ]) => ticket),
          catchError(err => {
            return of(null);
          }),
          tap(() => this.sessionUpdating.next(false)),
        );
    } else {
      return throwError(null);
    }
  }

  private mapSessionToDTO(session: Session): SessionDTO {
    return  {
      ...session,
      filmId: session.film.id,
      roomId: session.room.id,
      film: undefined,
      room: undefined
    } as SessionDTO;
  }
}
