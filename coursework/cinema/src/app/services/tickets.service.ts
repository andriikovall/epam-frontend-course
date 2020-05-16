import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ticket, TicketDTO } from '../models/ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private baseUrl = environment.baseApiUrl + 'tickets/';

  constructor(private http: HttpClient) { }

  inserTicket(ticket: Ticket): Observable<TicketDTO> {
    return this.http.post<TicketDTO>(this.baseUrl, this.mapTicketToDTO(ticket));
  }

  private mapTicketToDTO(ticket: Ticket): TicketDTO {
    return {
      ...ticket,
      userId: ticket.user ? ticket.user.id : undefined,
      roomId: ticket.room.id,
      filmId: ticket.film.id,
      user: undefined,
      room: undefined,
      film: undefined
    } as TicketDTO;
  }

}
