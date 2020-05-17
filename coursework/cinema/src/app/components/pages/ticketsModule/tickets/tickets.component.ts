import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base.component';
import { PaginationEvent } from 'src/app/models/helpers/paginationEvent';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent extends BaseComponent implements OnInit {

  public tickets: Ticket[];
  public ticketsLoading: boolean;
  public get paginatedTickets(): Ticket[] {
    if (!this.tickets)
      return null;

    return this.tickets.slice((this.currentPage - 1) * this.itemsPerPage,
                               this.currentPage * this.itemsPerPage);
  }
  public currentPage: number;

  public itemsPerPage = 5;

  constructor(private ticketsService: TicketsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.ticketsLoading = true;
    this.ticketsService.getUserTickets(this.authService.currentUser.getValue().id)
      .subscribe(tickets => {
        this.tickets = tickets;
        this.ticketsLoading = false;
      })
    const currPage = parseInt(this.route.snapshot.paramMap.get('pageNum'));
    this.setCurrentPage(currPage);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.router.navigate(['tickets/page', page]);
  }

  onPageChanged(event: PaginationEvent) {
    this.setCurrentPage(event.currentPage);
  }

}
