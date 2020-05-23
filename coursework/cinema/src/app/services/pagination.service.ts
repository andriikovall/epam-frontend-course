import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public routePrefix: BehaviorSubject<string[]>;

  constructor() {
    this.routePrefix = new BehaviorSubject<string[]>([]);
  }
}
