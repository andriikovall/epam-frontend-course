import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HTPPInterseptorService implements HttpInterceptor {

  constructor(private baseService: BaseService,
              private toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.baseService.networkError.next(false);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent || err.status >= 500 || err.status == 0) {
          this.toastService.error('Unexpected error', 'Some error occured, please try again later');
          this.baseService.networkError.next(true);
        }
        return throwError(err);
      })
    );
  }
}
