import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmsService } from 'src/app/services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { ToastService } from 'src/app/services/toast.service';
import { Session } from 'src/app/models/session';
import { combineLatest } from 'rxjs';
import { SessionsService } from 'src/app/services/sessions.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent extends BaseComponent implements OnInit {

  public film: Film;
  public filmLoading: boolean;
  public commentsLoading: boolean;
  public addingComment: boolean;
  public sessions: Session[];
  public filmDates: Date[];
  public currentDate: Date;
  public currentSession: Session;

  // just to open moment for template
  public moment = moment;

  public get filteredSessions(): Session[] {
    if (!this.currentDate) {
      return null;
    }
    return this.sessions.filter(s => new Date(s.timestamp).toDateString() ==
                                    this.currentDate.toDateString());
  }

  public commentControl: FormControl;
  public minCommentLength = 10;
  public maxCommentLength = 1000;

  public get paginatedComments(): Comment[] {
    const loverBound = this.comments.length - this.commentsLimit < 0 ?
                       0 :
                       this.comments.length - this.commentsLimit;
    return this.comments.slice(loverBound , this.comments.length);
  }
  public comments: Comment[];
  private commentsOpeningStep = 20;
  private commentsLimit = 10;


  constructor(public filmsService: FilmsService,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private sessionsService: SessionsService,
              public authService: AuthService,
              private commentsService: CommentsService) {
    super();
  }

  ngOnInit() {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.loadFilm(filmId);
      this.loadComments(filmId);
    } else {
      this.onLoadFilmError();
    }

    this.onDateSelected(new Date(Date.now()));
    this.commentControl = new FormControl('', [Validators.required,
                                               Validators.minLength(this.minCommentLength),
                                               Validators.maxLength(this.maxCommentLength)]);
  }

  loadFilm(id: string) {
    this.filmLoading = true;
    combineLatest([this.filmsService.getFilmById(id), this.sessionsService.getFilmSessions(id)])
      .subscribe(([film, sessions]) => {
        this.film = film;
        this.sessions = sessions;
        this.createFilmDates();
      }, err => {
        this.onLoadFilmError();
      }, () => {
        this.filmLoading = false;
      });
  }

  loadComments(filmId: string) {
    this.commentsLoading = true;
    this.commentsService.getFilmComments(filmId).subscribe(comments => {
      this.comments = comments;
    }, err => {
      this.onCommentsLoadError();
    }, () => {
      this.commentsLoading = false;
    })
  }

  createFilmDates() {
    this.filmDates = this.sessions.map(s => new Date(s.timestamp));
  }

  onLoadFilmError() {
    this.toastService.error('Failed to load film', 'Probably, the link was broken or intertanl server error');
  }

  onCommentsLoadError() {
    this.toastService.error('Failed to load comments', 'Check your internet connection or internal server error');
  }

  onCommentPostError() {
    this.toastService.error('Failed to post comment', 'Check your internet connection or internal server error')
  }

  onCommentPostSuccess() {
    this.toastService.success('Successfully added comment', 'Thanks for your one!');
    this.commentControl.reset('');
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

  onCommentSubmit() {
    if (this.commentControl.invalid || !this.authService.isAuthenticated) {
      this.commentControl.markAsDirty();
      return;
    }
    const comment: Comment = {
      filmId: this.film.id,
      message: this.commentControl.value,
      user: this.authService.currentUser.getValue(),
      timestamp: Date.now()
    }

    this.addingComment = true;
    this.commentsService.addComment(comment).subscribe(res => {
      this.comments.push(comment);
      this.onCommentPostSuccess();
    }, err => {
      this.onCommentPostError();
    }, () => {
      this.addingComment = false;
    })
  }

  onMoreComments() {
    setTimeout(() => {
      this.commentsLimit += this.commentsOpeningStep;
    })
  }

}
