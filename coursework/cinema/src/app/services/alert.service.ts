import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public confirmTitle: string;
  public confirmText: string;
  public confirmOkText: string = 'Yes';
  public confirmNoText: string = 'No';

  public alertTitle: string;
  public alertText: string;
  public alertOkText: string = 'Ok';

  public showConfirm: Subject<boolean>;
  public showAlert: Subject<boolean>;

  private confirmResponse: Subject<boolean>;
  private alertResponse: Subject<void>;

  private confirmResponseSubsription: Subscription;
  private alertResponseSubsription: Subscription;

  constructor() {
    this.confirmResponse = new Subject<boolean>();
    this.alertResponse = new Subject<void>();
    this.showConfirm = new Subject<boolean>();
    this.showAlert = new Subject<boolean>();
  }

  private removeModals(): void {
    this.showConfirm.next(false);
    this.showAlert.next(false);
  }

  confirm(title: string, text: string, okText: string = 'Yes', noText: string = 'No'): Promise<boolean> {
    this.removeModals();
    this.showConfirm.next(true);
    this.confirmTitle = title;
    this.confirmText = text;
    this.confirmOkText = okText;
    this.confirmNoText = noText;
    return new Promise((resolve) => {
      if (this.confirmResponseSubsription) {
        this.confirmResponseSubsription.unsubscribe();
      }
      this.confirmResponseSubsription = this.confirmResponse.subscribe(res => {
        this.removeModals();
        resolve(res);
      });
    });

    // this didn't work
    // return this.confirmResponse.toPromise();
  }

  alert(title: string, text: string, okText: string = 'Ok'): Promise<void> {
    this.removeModals();
    this.showAlert.next(true);
    this.alertTitle = title;
    this.alertText = text;
    this.alertOkText = okText;
    return new Promise((resolve) => {
      if (this.alertResponseSubsription) {
        this.alertResponseSubsription.unsubscribe();
      }
      this.alertResponseSubsription = this.alertResponse.subscribe(res => {
        this.removeModals();
        resolve(res);
      });
    });
  }

  respondConfirm(response: boolean) {
    this.confirmResponse.next(response);
  }

  responseAlert() {
    this.alertResponse.next(void 0);
  }

  dispose() {
    if (this.confirmResponseSubsription) {
      this.confirmResponseSubsription.unsubscribe();
    }
    if (this.alertResponseSubsription) {
      this.alertResponseSubsription.unsubscribe();
    }
  }
}
