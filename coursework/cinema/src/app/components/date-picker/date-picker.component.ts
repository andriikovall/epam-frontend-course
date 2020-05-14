import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Calendar } from 'calendar';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input() dates: Date[] = [];
  @Input() initialDate: Date;

  @Output() dateSelected = new EventEmitter<Date>();

  public monthDays = new Map<number, Date[]>();
  public currentMonthIndex: number;
  public selectedDate: Date;

  private calendar = new Calendar(1);
  private currentYear = new Date().getFullYear();


  public get currentMonthDatesCalendar(): Date[] {
    const dates = this.monthDays.get(this.currentMonthIndex);
    if (!dates)
      return [];

    const mappedDates: Date[] = [];
    const month: number[][] = this.calendar.monthDays(this.currentYear, this.currentMonthIndex);
    for (const week of month) {
      for (const day of week) {
        if (day == 0) {
          mappedDates.push(null)
        } else {
          const date: Date = dates.find(d => d.getDate() == day);
          mappedDates.push(date && date.getTime() >= Date.now() ? date : null);
        }
      }
    }
    // find first not null date
    if (!this.selectedDate)
      this.onDateSecelted(mappedDates.find(d => d));

    return mappedDates;
  }

  constructor() { }

  ngOnInit() {
    this.dates = [...new Set(this.dates.map(d => d.toDateString()))]
    .map(d => new Date(d))
    .sort((d1, d2) => d1 > d2 ? 1 : -1);

    this.dates.forEach(d => {
      const currentDateMonthDays = this.monthDays.get(d.getMonth()) || [];
      this.monthDays.set(d.getMonth(), [...currentDateMonthDays, d]);
    });

    this.currentMonthIndex = this.dates[0].getMonth() || new Date().getMonth();

    if (this.initialDate && this.initialDate.getTime() >= Date.now())
      this.onDateSecelted(this.initialDate);
  }

  onDateSecelted(date: Date) {
    if (!date)
      return;
    this.dateSelected.emit(date);
    this.selectedDate = date;
  }

  onMonthLeftClicked() {
    this.currentMonthIndex -=1;
    if (!this.monthDays.get(this.currentMonthIndex))
      this.currentMonthIndex += 1;
  }

  onMonthRightClicked() {
    this.currentMonthIndex += 1;
    if (!this.monthDays.get(this.currentMonthIndex))
      this.currentMonthIndex -=1;
  }

}
