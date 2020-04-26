import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/app/models/film';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
  animations: [
    trigger('frontBack', [
      state('front', style({
        marginLeft: '0',
        opacity: 1,
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front => back', [
        animate('0.8s ease')
      ]),
      transition('back => front', [
        animate('0.8s ease')
      ])
    ])
  ]
})
export class FilmCardComponent implements OnInit {

  constructor() { }

  @Input() film: Film;

  ngOnInit() {
  }

}
