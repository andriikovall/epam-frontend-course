import { Component, OnInit } from '@angular/core';
import { ToastType } from 'src/app/models/helpers/toastItem';
import { ToastService } from 'src/app/services/toast.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss']
})
export class ToastsContainerComponent extends BaseComponent implements OnInit {

  constructor(public toastService: ToastService) {
    super();
  }

  ngOnInit() {
  }

  getToastClassModifier(type: ToastType) {
    return `toast-${type}`;
  }

}
