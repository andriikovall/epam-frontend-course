import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Film } from 'src/app/models/film';
import { FilmsService } from 'src/app/services/films.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { BasePageComponent } from '../../components/base-page.component';
import { Room } from 'src/app/models/room';
import { GalleryItem } from 'src/app/models/helpers/galleryItem';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BasePageComponent implements OnInit {

  public newestFilms: Observable<Film[]>;
  // Removed observable to pass items to gallery component.
  // Had an issue that async pipe didn't work -_-
  public galleryItems: GalleryItem[];
  public rooms: Observable<Room[]>;
  public filmsLoading: boolean;
  public roomsLoading: boolean;


  constructor(private filmsService: FilmsService,
              private roomsService: RoomsService) {
    super();
  }

  ngOnInit() {
    this.filmsLoading = true;
    this.newestFilms = this.filmsService.getNewestFilms().pipe(
      tap(() => { setTimeout(() => this.filmsLoading = false, 0); })
    );
    this.roomsLoading = true;
    this.roomsService.getAllRooms().pipe(
      map(rooms => rooms.map(r => ({ src: r.photoUrl }))),
      tap(() => { setTimeout(() => this.roomsLoading = false, 0); }),
    ).subscribe(gi => this.galleryItems = gi);
  }

}
