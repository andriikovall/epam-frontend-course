import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAvaComponent } from '../components/user-ava/user-ava.component';
import { SessionPickerComponent } from '../components/session-picker/session-picker.component';
import { FilmCardComponent } from '../components/film-card/film-card.component';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';





@NgModule({
  declarations: [
    LoaderComponent,
    UserAvaComponent,
    SessionPickerComponent,
    FilmCardComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    UserAvaComponent,
    FilmCardComponent,
    SessionPickerComponent,
    DatePickerComponent
  ]
})
export class SharedModule { }
