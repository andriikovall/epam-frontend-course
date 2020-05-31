import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAvaComponent } from '../components/user-ava/user-ava.component';
import { SessionPickerComponent } from '../components/session-picker/session-picker.component';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';
import { CollapseComponent } from '../components/collapse/collapse.component';
import { SessionComponent } from '../components/session/session.component';
import { FilmCardComponent } from '../components/film-card/film-card.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

import { LoadingDirective } from '../directives/loading.directive';
import { ToastsContainerComponent } from '../components/toasts-container/toasts-container.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { ModalComponent } from '../components/modal/modal.component';
import { AlertsContainerComponent } from '../components/alerts-container/alerts-container.component';


@NgModule({
  declarations: [
    LoaderComponent,
    UserAvaComponent,
    SessionPickerComponent,
    DatePickerComponent,
    CollapseComponent,
    SessionComponent,
    LoadingDirective,
    PaginationComponent,
    ToastsContainerComponent,
    FilmCardComponent,
    GalleryComponent,
    ModalComponent,
    AlertsContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    UserAvaComponent,
    SessionPickerComponent,
    DatePickerComponent,
    CollapseComponent,
    SessionComponent,
    LoadingDirective,
    PaginationComponent,
    ToastsContainerComponent,
    FilmCardComponent,
    GalleryComponent,
    ModalComponent,
    AlertsContainerComponent
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class SharedModule { }
