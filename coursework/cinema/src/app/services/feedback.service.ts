import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from '../models/feedback';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BaseService } from './base.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  private feedbackApiBaseUrl = environment.baseApiUrl + 'feedbacks/';
  public feedbackLoading = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    super();
  }

  saveFeedback(fb: FeedBack): Observable<FeedBack> {
    this.feedbackLoading.next(true);
    this.networkError.next(false);
    return this.httpClient.post<FeedBack>(this.feedbackApiBaseUrl, fb).pipe(
      catchError(() => {
        this.networkError.next(true);
        return of(null);
      }),
      tap(() => this.feedbackLoading.next(false))
    );
  }
}
