import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  {
    path: 'home', component: MainComponent
  },
  {
    path: 'films',
    loadChildren: './pages/filmsModule/films.module#FilmsModule'
  },
  {
    path: 'auth',
    loadChildren: './pages/authModule/auth.module#AuthModule'
  },
  {
    path: 'contacts',
    loadChildren: './pages/contactsModule/contacts.module#ContactsModule'
  },
  {
    path: 'sessions',
    loadChildren: './pages/sessionsModule/sessions.module#SessionsModule'
  },
  {
    path: 'tickets',
    loadChildren: './pages/ticketsModule/tickets.module#TicketsModule'
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'prefix',
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
