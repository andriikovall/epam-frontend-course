import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { FilmComponent } from './film/film.component';


const routes: Routes = [
  { path: 'page/:pageNum', component: FilmsComponent },
  { path: '', redirectTo: 'page/1' },
  { path: ':id', component: FilmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
