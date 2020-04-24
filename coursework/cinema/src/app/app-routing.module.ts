import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';


const routes: Routes = [
  {
    path: 'films', loadChildren: () => import('./components/pages/filmsModule/films.module').then(m => m.FilmsModule)
  },
  {
    path: 'home', component: MainComponent,
    data: { breadCrumbTitle: 'Home' }
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'prefix',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
