import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'home', component: MainComponent
  },
  {
    path: 'films', loadChildren: () => import('./components/pages/filmsModule/films.module').then(({ FilmsModule }) => FilmsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./components/pages/authModule/auth.module').then(({ AuthModule }) => AuthModule)
  },
  {
    path: 'contacts', loadChildren: () => import('./components/pages/contactsModule/contacts.module').then(({ ContactsModule }) => ContactsModule)
  },
  {
    path: 'sessions', loadChildren: () => import('./components/pages/sessionsModule/sessions.module').then(({ SessionsModule }) => SessionsModule)
  },
  {
    path: 'tickets', loadChildren: () => import('./components/pages/ticketsModule/tickets.module').then(({ TicketsModule }) => TicketsModule),
    // canLoad: [AuthGuard]
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
export class SharedRoutingModule { }
