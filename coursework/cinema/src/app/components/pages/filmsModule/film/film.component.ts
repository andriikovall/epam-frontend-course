import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmsService } from 'src/app/services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Session } from 'src/app/models/session';
import { combineLatest } from 'rxjs';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  public film: Film;
  public filmLoading: boolean;
  public sessions: Session[];
  public filmDates: Date[];
  public currentDate: Date;
  public currentSession: Session;

  public get filteredSessions(): Session[] {
    if (!this.currentDate) {
      return null;
    }
    return this.sessions.filter(s => new Date(s.timestamp).toDateString() ==
                                    this.currentDate.toDateString());
  }


  constructor(public filmsService: FilmsService,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              private sessionsService: SessionsService) { }

  ngOnInit() {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.loadFilm(filmId);
    } else {
      this.onLoadFilmError();
    }

    this.onDateSelected(new Date(Date.now()));
  }

  loadFilm(id: string) {
    this.filmLoading = true;
    combineLatest([this.filmsService.getFilmById(id), this.sessionsService.getFilmSessions(id)])
      .subscribe(([film, sessions]) => {
        this.film = film;
        this.sessions = sessions;
        this.filmLoading = false;
        this.createFilmDates();
      }, err => {
        this.onLoadFilmError();
      });
  }

  createFilmDates() {
    this.filmDates = this.sessions.map(s => new Date(s.timestamp));
  }

  onLoadFilmError() {
    this.toastService.error('Faild to load film', 'Probably, the link was broken or intertanl server error');
    this.filmLoading = false;
  }

  onDateSelected(date: Date) {
    setTimeout(() => {
      this.currentDate = date;
      this.currentSession = null;
    }, 0);
  }

  onSessionSelected(session: Session) {
    if (this.currentSession && session.id == this.currentSession.id) {
      this.currentSession = null;
    } else {
      this.currentSession = session;
    }
  }

}
