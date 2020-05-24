import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Film } from 'src/app/models/film';
import { FilmsService } from 'src/app/services/films.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { BaseComponent } from '../../base.component';
import { Room } from 'src/app/models/room';
import { GalleryItem } from 'src/app/models/helpers/galleryItem';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

  public newestFilms: Observable<Film[]>;
  public rooms: Observable<Room[]>;
  public galleryItems: Observable<GalleryItem[]>;
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
    this.galleryItems = this.roomsService.getAllRooms().pipe(
      tap(() => { setTimeout(() => this.roomsLoading = false, 0); }),
      map(rooms => rooms.map(r => ({ src: r.photoUrl })))
    );
  }

}
