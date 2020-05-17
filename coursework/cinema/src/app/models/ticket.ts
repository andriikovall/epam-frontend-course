import { Room } from './room';
import { User } from './user';
import { Film } from './film';

export class Ticket {
  id?: string;
  sessionId: string;
  room: Room;
  user?: User;
  film: Film;
  row: number;
  col: number;
  price: number;
  timestamp: number;
}

export class TicketDTO {
  id: string;
  sessionId: string;
  roomId: string;
  userId?: string;
  filmId: string;
  row: number;
  col: number;
  price: number;
  timestamp: number;
}
