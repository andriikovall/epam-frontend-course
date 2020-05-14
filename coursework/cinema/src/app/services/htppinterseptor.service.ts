import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class HTPPInterseptorService implements HttpInterceptor {

  constructor(private baseService: BaseService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.baseService.networkError.next(false);
    return next.handle(req).pipe(
      catchError(err => {
        this.baseService.networkError.next(true);
        console.log('interseptor HERE');
        return throwError(err);
      })
    )
  }
}
