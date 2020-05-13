import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../models/session';

@Component({
  selector: 'app-session-picker',
  templateUrl: './session-picker.component.html',
  styleUrls: ['./session-picker.component.scss']
})
export class SessionPickerComponent implements OnInit {

  @Input() sessions: Session[] = [];

  @Output() timeSelected = new EventEmitter<Session>();

  constructor() { }

  ngOnInit() {
  }

  onTimeClicked(session: Session) {
    this.timeSelected.emit(session);
  }

}
