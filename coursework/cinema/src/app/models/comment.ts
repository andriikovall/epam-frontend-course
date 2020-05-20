import { User } from './user';

export class Comment {
  id?: string;
  user: User;
  message: string;
  timestamp: number;
  filmId: string;
}

export class CommentDTO {
  id?: string;
  userId: string;
  message: string;
  timestamp: number;
  filmId: string;
}
