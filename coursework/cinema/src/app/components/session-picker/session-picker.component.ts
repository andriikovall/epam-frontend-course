import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../models/session';
import { BasePageComponent } from '../base-page.component';

@Component({
  selector: 'app-session-picker',
  templateUrl: './session-picker.component.html',
  styleUrls: ['./session-picker.component.scss']
})
export class SessionPickerComponent extends BasePageComponent implements OnInit {

  @Input() sessions: Session[] = [];
  @Input() isActive: boolean = true;

  @Output() timeSelected = new EventEmitter<Session>();

  public selectedSession: Session;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onTimeClicked(session: Session) {
    this.selectedSession = session;
    this.timeSelected.emit(session);
  }

}
