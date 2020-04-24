import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { FilmComponent } from './film/film.component';


const routes: Routes = [
  {
    path: '', component: FilmsComponent,
    data: { breadCrumbTitle: 'Films' }
  },
  {
    path: ':id', component: FilmComponent,
    data: { breadCrumbTitle: 'Home' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
