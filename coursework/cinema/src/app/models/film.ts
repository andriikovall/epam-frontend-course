import { RoomState } from './room';

export class Film {
  id: string;
  title: string;
  bio: string;
  directors: string[];
  imageUrl: string;
  date: number;
  genres: string[];
  comments: Comment[];
  availableTime: RoomState[];
  duration: number;
}

export class Comment {
  id: string;
  date: Date;
  text: string;
  userId: string;
}

