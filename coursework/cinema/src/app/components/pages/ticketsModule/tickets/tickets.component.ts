import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePaginationComponent } from 'src/app/components/base-pagination.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent extends BasePaginationComponent implements OnInit {

  public tickets: Ticket[];
  public ticketsLoading: boolean;
  public get paginatedTickets(): Ticket[] {
    if (!this.tickets)
      return null;

    return this.tickets.slice(this.offset,
                               this.limit + this.offset);
  }

  constructor(private ticketsService: TicketsService,
              private authService: AuthService,
              public route: ActivatedRoute,
              public router: Router) {
    super(route, router, ['tickets']);
  }

  ngOnInit() {
    this.ticketsLoading = true;
    this.ticketsService.getUserTickets(this.authService.currentUser.getValue().id)
      .subscribe(tickets => {
        this.tickets = tickets;
        this.ticketsLoading = false;
      })
    super.ngOnInit();
  }

}