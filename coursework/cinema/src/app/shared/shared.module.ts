import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAvaComponent } from '../components/user-ava/user-ava.component';
import { SessionPickerComponent } from '../components/session-picker/session-picker.component';
import { FilmCardComponent } from '../components/film-card/film-card.component';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';
import { CollapseComponent } from '../components/collapse/collapse.component';
import { SessionComponent } from '../components/session/session.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

import { LoadingDirective } from '../directives/loading.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    UserAvaComponent,
    SessionPickerComponent,
    FilmCardComponent,
    DatePickerComponent,
    CollapseComponent,
    SessionComponent,
    LoadingDirective,
    PaginationComponent
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
    DatePickerComponent,
    CollapseComponent,
    SessionComponent,
    LoadingDirective,
    PaginationComponent
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class SharedModule { }
