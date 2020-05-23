import { Injectable } from '@angular/core';
import { ToastItem, ToastType } from '../models/helpers/toastItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public get toasts(): BehaviorSubject<ToastItem[]> {
    return this._toasts;
  }

  private get toastsValue(): ToastItem[] {
    return this._toasts.value;
  }

  private defaultToastDuration = 4500;

  private _toasts = new BehaviorSubject<ToastItem[]>([]);

  constructor() { }

  error(title: string, message: string, duration: number = this.defaultToastDuration): void {
    this.createToast('danger', title, message, duration);
  }

  success(title: string, message: string, duration: number = this.defaultToastDuration): void {
    this.createToast('success', title, message, duration);
  }

  info(title: string, message: string, duration: number = this.defaultToastDuration): void {
    this.createToast('info', title, message, duration);
  }

  private createToast(type: ToastType, title: string, message: string, duration: number = 5000) {
    const toast = new ToastItem(type, title, message);
    this._toasts.next([...this.toastsValue, toast]);
    this.removeToastAfterTimeout(toast.id, duration);
  }

  private removeToastAfterTimeout(toastId: number, timeout: number) {
    setTimeout(() => {
      const filteredList = this.toastsValue.filter(t => t.id !== toastId);
      this._toasts.next([...filteredList]);
    }, timeout);
  }
}
