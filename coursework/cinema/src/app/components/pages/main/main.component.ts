import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Film } from 'src/app/models/film';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public newestFilms: Observable<Film[]>;
  public filmsLoading: boolean;

  constructor(private filmsService: FilmsService) { }

  ngOnInit() {
    this.filmsLoading = true;
    this.newestFilms = this.filmsService.getNewestFilms().pipe(
      tap((_) => this.filmsLoading = false)
    )
  }

}
