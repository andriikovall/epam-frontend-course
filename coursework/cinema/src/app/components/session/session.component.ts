import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'src/app/models/session';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  @Input() session: Session;

  public tickets: Ticket[] = [];

  public get totalTicketsPrice(): number {
    return this.tickets.reduce((sum, t) => t.price + sum, 0);
  }

  constructor() { }

  ngOnInit() {
  }

  public isSittingSelected(row: number, col: number) {
    return this.tickets.some(t => t.row == row && t.col == col);
  }

  public onPlaceSelected(row: number, col: number) {
    if (this.session.sittings[row][col]) {
      return;
    }

    if (this.isSittingSelected(row, col)) {
      this.tickets = this.tickets.filter(t =>  !(t.row == row && t.col == col));
    } else {
      const ticket: Ticket = {
        row,
        col,
        film: this.session.film,
        sessionId: this.session.id,
        room: this.session.room,
        price: this.session.room.price,
      };

      this.tickets.push(ticket);
    }
  }

}
