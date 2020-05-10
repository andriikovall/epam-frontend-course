import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { MainComponent } from './components/pages/main/main.component';
import { CarouselComponent } from './components/carousel/carousel.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { LoadingDirective } from './directives/loading.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    CarouselComponent,
    FilmCardComponent,
    LoadingDirective,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
