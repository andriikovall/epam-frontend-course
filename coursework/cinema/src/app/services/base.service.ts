import { BehaviorSubject } from 'rxjs';

export class BaseService {
  public networkError = new BehaviorSubject<boolean>(false);
}
