import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/models/carouselItem';
import { trigger, state, style, transition, animate, sequence } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('openedClosed', [
      state('opened', style({
        marginLeft: '0',
        opacity: 1,
      })),
      state('closed', style({
        marginLeft: '-100%',
        opacity: 0,
      })),
      transition('opened => closed', [
        animate('0.8s ease')
      ]),
      transition('closed => opened', [
        animate('0.8s ease')
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  public items: CarouselItem[];
  public dots: any[];

  public get currentCarouselIndex() {
    return this._currentCarouselIndex;
  }

  public set currentCarouselIndex(index: number) {
    this._currentCarouselIndex = index;
    this.resetChangingInterval();
  }

  private _currentCarouselIndex = 0;
  private intervalObj: any;
  private intervalTime = 5000;

  constructor() {
    this.items = [
      { title: 'Feel it, see it', backgroudSrc: 'assets/carousel/1.jpg' },
      { title: 'Best technologies', backgroudSrc: 'assets/carousel/2.png' },
      { title: 'You will remember it...', backgroudSrc: 'assets/carousel/3.jpg' },
    ]
    this.dots = new Array(this.items.length);
    this.setChangingInterval();
  }

  ngOnInit() {
  }

  next(event = null) {
    if (event)
      this.resetChangingInterval()
    this._currentCarouselIndex += 1;
    if (this._currentCarouselIndex >= this.items.length)
      this._currentCarouselIndex = 0;
  }

  prev(event = null) {
    if (event)
      this.resetChangingInterval();
    this._currentCarouselIndex -= 1;
    if (this._currentCarouselIndex < 0)
      this._currentCarouselIndex = this.items.length - 1;
  }

  setChangingInterval() {
    this.intervalObj = setInterval(() => this.next(), this.intervalTime);
  }

  resetChangingInterval() {
    clearInterval(this.intervalObj);
    this.setChangingInterval();
  }

}
