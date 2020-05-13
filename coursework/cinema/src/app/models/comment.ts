import { User } from './user';

export class Comment {
  user: User;
  message: string;
  timestamp: number;
  filmId: string;
}

export class CommentDTO {
  userId: string;
  massage: string;
  timestamp: number;
  filmId: string;
}
