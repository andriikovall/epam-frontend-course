import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Session } from 'src/app/models/session';
import { Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { User } from 'src/app/models/user';
import { FormControl, Validators } from '@angular/forms';
import { SessionsService } from 'src/app/services/sessions.service';
import { BaseService } from 'src/app/services/base.service';
import { BasePageComponent } from '../base-page.component';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent extends BasePageComponent implements OnInit, OnDestroy {

  @Input() session: Session;
  @Output() closeDetails = new EventEmitter();

  public tickets: Ticket[] = [];
  public currentUser: User;

  public emailControl: FormControl;

  private authServiceSubsription: Subscription;

  public get totalTicketsPrice(): number {
    return this.tickets.reduce((sum, t) => t.price + sum, 0);
  }

  constructor(public authService: AuthService,
              public sessionsService: SessionsService,
              public baseService: BaseService,
              private toastService: ToastService,
              private alertService: AlertService) {
    super();
  }

  ngOnInit() {
    this.authServiceSubsription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.emailControl = new FormControl('', [ Validators.email, Validators.required ]);
  }

  isSittingSelected(row: number, col: number) {
    return this.tickets.some(t => t.row == row && t.col == col);
  }

  onPlaceSelected(row: number, col: number) {
    if (this.session.sittings[row][col]) {
      return;
    }

    if (this.isSittingSelected(row, col)) {
      this.tickets = this.tickets.filter(t => !(t.row == row && t.col == col));
    } else {
      const ticket: Ticket = {
        row,
        col,
        film: this.session.film,
        sessionId: this.session.id,
        room: this.session.room,
        price: this.session.room.price,
        timestamp: this.session.timestamp
      };

      if (this.currentUser) {
        ticket.userId = this.currentUser.id;
      }

      this.tickets.push(ticket);
    }
  }

  onBuyClicked(): void {
    if (!this.currentUser && this.emailControl.invalid || !this.tickets.length) {
      this.emailControl.markAsDirty();
      return;
    }
    this.alertService.confirm('Buy tickets?', 'Are you sure you want to buy selected tickets?')
      .then(res => {
        if (res) {
          this.onBuyConfirmed();
        }
      });
  }

  onBuyConfirmed() {
    combineLatest(
      this.tickets.map(t => this.sessionsService.updateSessionWithTicket(this.session, t))
    ).subscribe(tickets => {
      const toastTitle = `You have successfully booked your ${tickets.length > 1 ? 'tickets' : 'ticket'}`;
      const toastMessage = this.currentUser ?
                      'Check out your tickets in your personal cabinet' :
                      `Check out your tickets on the provided email: ${this.emailControl.value}`;
      this.toastService.success(toastTitle, toastMessage, 8000);
      this.tickets = [];
      this.closeDetails.emit();
    });
  }

  ticketTrackFn(index, ticket: Ticket) {
    return `${ticket.row}_${ticket.col}`;
  }

  onClose() {
    this.closeDetails.emit();
  }


  ngOnDestroy(): void {
    this.authServiceSubsription.unsubscribe();
  }

}
