import { Film } from './film';
import { Room } from './room';

export class Session {
  id: string;
  timestamp: number;
  room: Room;
  film: Film;
  sittings: number[][];
  sessionType: string;
}


export class SessionDTO {
  id: string;
  timestamp: number;
  roomId: string;
  filmId: string;
  sittings: number[][]; // 1-busy, 0-free
  sessionType: string;
}
