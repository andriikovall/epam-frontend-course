import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';
import { Session } from 'src/app/models/session';
import { FilmSessions } from 'src/app/models/filmSessions';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from 'src/app/models/film';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  constructor(private sessionsService: SessionsService,
              private filmsService: FilmsService) { }

  public sessions: Session[];
  public sessionsLoading: boolean;
  public filmsSessions: FilmSessions[];
  public selectedFilmId: string;

  private films: Film[];

  ngOnInit() {
    this.sessionsLoading = true;
    combineLatest([this.sessionsService.getAllSessions(), this.filmsService.getFilms()])
      .subscribe(([sessions, films]) => {
        this.sessions = sessions;
        this.films = films;
        this.sessionsLoading = false;
        this.createFilmsSessions();
      })
  }

  private createFilmsSessions() {
    const filmsIdsToSessionsMap = new Map<string, Session[]>();
    for (const session of this.sessions) {
      const currentFilmSessions = filmsIdsToSessionsMap.get(session.film.id) || [];
      filmsIdsToSessionsMap.set(session.film.id, [...currentFilmSessions, session]);
    }

    this.filmsSessions = [];
    for (const filmId of filmsIdsToSessionsMap.keys()) {
      const film = this.films.find(f => f.id === filmId);
      if (film) {
        this.filmsSessions.push({ film, sessions: filmsIdsToSessionsMap.get(filmId) });
      }
    }
  }

  onTimeSelected(session: Session) {
    console.log('session:', session);
    this.selectedFilmId = session.film.id;
  }

}
