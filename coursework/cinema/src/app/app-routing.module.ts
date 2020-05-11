import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';


const routes: Routes = [
  {
    path: 'films', loadChildren: () => import('./components/pages/filmsModule/films.module').then(({ FilmsModule }) => FilmsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./components/pages/authModule/auth.module').then(({ AuthModule }) => AuthModule)
  },
  {
    path: 'home', component: MainComponent },
  {
    path: '', redirectTo: 'home', pathMatch: 'prefix',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
