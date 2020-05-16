import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SessionsService } from 'src/app/services/sessions.service';
import { Session } from 'src/app/models/session';
import { FilmSessions } from 'src/app/models/filmSessions';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from 'src/app/models/film';
import { isValidDate } from '../../../../utils/date';
import { SessionFilter } from 'src/app/models/sessionFilter';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
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
  public sessionTypesForm: FormGroup;

  public get control2D(): AbstractControl {
    return this.sessionTypesForm.get('2D');
  }

  public get control3D(): AbstractControl {
    return this.sessionTypesForm.get('3D');
  }

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
        this.createInitialFiltersFromQuery();
      })

    this.paramsSubscription = this.route.queryParams
      .subscribe((params) => this.onQueryParamsChanged(params));

    this.route.snapshot.queryParamMap
    this.sessionTypesForm = new FormGroup({
      '2D': new FormControl(false),
      '3D': new FormControl(false)
    });
  }

  private onQueryParamsChanged(params: Params) {
    if (this.filteredFilmsSessions)
      this.updateSessionsByFilters(params);
  }

  private updateQueryParams(filter: SessionFilter) {

    const params: Params = Object.keys(filter)
    .reduce((accum, key) => {
      if (filter[key]) {
        accum[key] = filter[key];
      }
      return accum;
    }, {});

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge',
      });
  }

  private updateSessionsByFilters(filters: SessionFilter) {
    this.filteredFilmsSessions = this.filmsSessions.map(filmsSession => {

      let filteredSessions: Session[] = [];

      if (filters.date) {
        filteredSessions = filmsSession.sessions
          .filter(s => new Date(s.timestamp).toDateString() == filters.date);
      }

      if (filters.sessionTypes) {
        try {
          const sessionTypes: string[] = JSON.parse(filters.sessionTypes) || [];
          this.setInitialSessionsTypesFormValues(sessionTypes);
          if (sessionTypes.length) {
            filteredSessions = filteredSessions.filter(s => sessionTypes.includes(s.sessionType));
          }
        } catch (err) {}
      }

        return { ...filmsSession, sessions: filteredSessions};
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

  private createInitialFiltersFromQuery() {
    const date = new Date(this.route.snapshot.queryParamMap.get('date'));
    if (isValidDate(date)) {
      this.initialDate = date;
    } else {
      this.initialDate = null;
    }
    let initialSessionsTypes: string[] = [];
    try {
      initialSessionsTypes = JSON.parse(this.route.snapshot.queryParamMap.get('sessionTypes'));
    } catch(err) {}

    this.updateSessionsByFilters({
      date: date.toDateString(),
      sessionTypes: JSON.stringify(initialSessionsTypes)
    });

    this.setInitialSessionsTypesFormValues(initialSessionsTypes);
  }

  setInitialSessionsTypesFormValues(values: string[]) {
    if (!values)
      return;
    values.forEach((curr) => {
      this.sessionTypesForm.get(curr).setValue(true);
    });
  }

  onSessionsFormChange() {
    const sessionTypes = Object.keys(this.sessionTypesForm.value)
      .filter(key => this.sessionTypesForm.value[key]);
    this.updateQueryParams({ sessionTypes: JSON.stringify(sessionTypes) });
  }

  onTimeSelected(session: Session) {
    this.selectedSession = session;
    console.log('this.selectedSession:', this.selectedSession);
  }

  onDateSelected(date: Date) {
    this.updateQueryParams({ date: date.toDateString() });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
