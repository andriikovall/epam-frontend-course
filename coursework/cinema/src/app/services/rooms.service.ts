import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseService {

  private baseUrl = environment.baseApiUrl + 'rooms/';

  constructor(private http: HttpClient) {
    super();
  }

  getRoomById(id: string): Observable<Room> {
    return this.http.get<Room>(this.baseUrl + id);
  }
}
