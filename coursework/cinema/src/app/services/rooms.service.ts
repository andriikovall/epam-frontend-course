import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from '../models/room';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseService {

  private baseUrl = environment.baseApiUrl + 'rooms/';

  private cachedRooms = new Map<string, Room>();
  private allRoomsCached: boolean;

  constructor(private http: HttpClient) {
    super();
  }

  cacheRoom(room: Room) {
    this.cachedRooms.set(room.id, room);
  }

  cacheRooms(): Observable<Room[]> {
    if (!this.allRoomsCached) {
      return this.http.get<Room[]>(this.baseUrl).pipe(
        tap(rooms => rooms.forEach((r) => this.cacheRoom(r))),
        tap(() => this.allRoomsCached = true)
        )
    }

    return of([...this.cachedRooms.values()]);
  }

  getRoomById(id: string): Observable<Room> {
    this.networkError.next(false);
    if (this.cachedRooms.has(id)) {
      return of(this.cachedRooms.get(id));
    }
    return this.http.get<Room>(this.baseUrl + id).pipe(
      tap(room => this.cacheRoom(room))
    );
  }

  getAllRooms(): Observable<Room[]> {
    this.networkError.next(false);
    if (this.allRoomsCached)
      return of([...this.cachedRooms.values()]);
    else
      return this.cacheRooms();

  }
}
