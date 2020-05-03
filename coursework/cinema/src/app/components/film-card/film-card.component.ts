import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/app/models/film';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  constructor() { }

  @Input() film: Film;

  public get currentDate(): number {
    return Date.now()
  }

  ngOnInit() {
  }

}
