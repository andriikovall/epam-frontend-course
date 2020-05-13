import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from '../models/room';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseService {

  private baseUrl = environment.baseApiUrl + 'rooms/';

  private cachedRooms = new Map<string, Room>();

  constructor(private http: HttpClient) {
    super();
  }

  cacheRoom(room: Room) {
    this.cachedRooms.set(room.id, room);
  }

  getRoomById(id: string): Observable<Room> {
    if (this.cachedRooms.has(id)) {
      return of(this.cachedRooms.get(id));
    }
    return this.http.get<Room>(this.baseUrl + id).pipe(
      tap(room => this.cacheRoom(room)),
      catchError(err => {
        this.networkError.next(true)
        return of(null);
      })
    )
    ;
  }
}
