import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';


const routes: Routes = [
  {
    path: 'home', component: MainComponent
  },
  {
    path: 'films',
    loadChildren: './components/pages/filmsModule/films.module#FilmsModule'
  },
  {
    path: 'auth',
    loadChildren: './components/pages/authModule/auth.module#AuthModule'
  },
  {
    path: 'contacts',
    loadChildren: './components/pages/contactsModule/contacts.module#ContactsModule'
  },
  {
    path: 'sessions',
    loadChildren: './components/pages/sessionsModule/sessions.module#SessionsModule'
  },
  {
    path: 'tickets',
    loadChildren: './components/pages/ticketsModule/tickets.module#TicketsModule'
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
