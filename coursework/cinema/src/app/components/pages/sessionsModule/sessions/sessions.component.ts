import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SessionsService } from 'src/app/services/sessions.service';
import { Session } from 'src/app/models/session';
import { FilmSessions } from 'src/app/models/filmSessions';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from 'src/app/models/film';
import { isValidDate } from '../../../../utils/date';
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, OnDestroy {

  constructor(private sessionsService: SessionsService,
              private filmsService: FilmsService,
              private route: ActivatedRoute,
              private router: Router) { }

  public sessions: Session[];
  public sessionsLoading: boolean;
  public filmsSessions: FilmSessions[];
  public filteredFilmsSessions: FilmSessions[];
  public selectedSession: Session;
  public availableDates: Date[];
  public initialDate: Date;

  private films: Film[];

  private paramsSubscription: Subscription;

  ngOnInit() {
    this.sessionsLoading = true;
    combineLatest([this.sessionsService.getAllSessions(), this.filmsService.getFilms()])
      .subscribe(([sessions, films]) => {
        this.sessions = sessions;
        this.films = films;
        this.sessionsLoading = false;
        this.createFilmsSessions();
        this.createDates();
        this.createInitialDate();
      })

    this.paramsSubscription = this.route.queryParams
      .subscribe((params) => this.onQueryParamsChanged(params));
  }

  private onQueryParamsChanged(params: Params) {
    console.log('params:', params)
    if (params.date && this.filmsSessions) {
      this.updateSessionsByFilters(params.date);
    }
  }

  private updateQueryParams(date: Date, film: Film = null) {
    // @todo add more filters
    const params: Params = {
      date: date.toDateString(),
      film: film ? film.id : null
    };

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
      });
  }

  private updateSessionsByFilters(date: string, filmId: string = null) {
    this.filteredFilmsSessions = this.filmsSessions.map(filmsSession => {
      const sessions: Session[] =
        filmsSession.sessions.filter(s => new Date(s.timestamp).toDateString() == date);

      return { ...filmsSession, sessions};
    });
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
        const sortedSessions = filmsIdsToSessionsMap.get(filmId).sort((s1, s2) => s1.timestamp > s2.timestamp ? 1 : -1);
        this.filmsSessions.push({ film, sessions: sortedSessions });
      }
    }
    this.filteredFilmsSessions = [...this.filmsSessions];
  }

  private createDates() {
    this.availableDates = this.sessions.map(s => new Date(s.timestamp));
  }

  private createInitialDate() {
    const date = new Date(this.route.snapshot.queryParamMap.get('date'));
    if (isValidDate(date)) {
      this.initialDate = date;
      this.updateSessionsByFilters(date.toDateString());
    } else {
      this.initialDate = null;
    }
  }

  onTimeSelected(session: Session) {
    this.selectedSession = session;
  }

  onDateSelected(date: Date) {
    this.updateQueryParams(date);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
