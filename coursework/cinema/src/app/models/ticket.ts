import { Room } from './room';
import { User } from './user';
import { Film } from './film';

export class Ticket {
  sessionId: string;
  room: Room;
  user: User;
  film: Film;
  row: number;
  col: number;
}
