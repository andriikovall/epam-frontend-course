import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, of } from 'rxjs';
import { CommentDTO, Comment } from '../models/comment';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = environment.baseApiUrl + 'comments/';


  constructor(private http: HttpClient,
              private authService: AuthService) { }


  getFilmComments(filmId: string): Observable<Comment[]> {
    return this.http.get<CommentDTO[]>(this.baseUrl, { params: { filmId }}).pipe(
      switchMap(comments => {
        if (!comments.length) {
          return of([]);
        }
        return combineLatest(comments.map(c => this.mapDTOToComment(c)));
      }),
    );
  }


  addComment(comment: Comment): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.baseUrl, this.mapCommentToDTO(comment));
  }

  private mapDTOToComment(commentDTO: CommentDTO): Observable<Comment> {
    return this.authService.getUserById(commentDTO.userId).pipe(
      map(user => ({ ...commentDTO, user }))
    );
  }

  private mapCommentToDTO(comment: Comment): CommentDTO {
    return {
      ...comment,
      userId: comment.user.id,
    };
  }
}
