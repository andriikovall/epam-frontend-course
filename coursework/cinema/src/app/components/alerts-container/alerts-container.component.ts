import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alerts-container',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.scss']
})
export class AlertsContainerComponent implements OnInit, OnDestroy {

  constructor(public alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.alertService.dispose();
  }

}
