import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public tickets: Ticket[];
  public ticketsLoading: boolean;
  public get paginatedTickets(): Ticket[] {
    if (!this.tickets)
      return null;

    console.log((this.currentPage - 1) * this.itemsPerPage)
    console.log(this.currentPage * this.itemsPerPage + 1)
    return this.tickets.slice((this.currentPage - 1) * this.itemsPerPage,
                               this.currentPage * this.itemsPerPage + 1);
  }
  public currentPage: number;

  private itemsPerPage = 3;

  constructor(private ticketsService: TicketsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.ticketsLoading = true;
    this.ticketsService.getUserTickets(this.authService.currentUser.getValue().id)
      .subscribe(tickets => {
        console.log('tickets:', tickets);
        this.tickets = tickets;
        this.ticketsLoading = false;
      })
    const currPage = parseInt(this.route.snapshot.paramMap.get('pageNum'));
    this.setCurrentPage(currPage);
  }

  setCurrentPage(page: number) {
    if (page < 1 || isNaN(page)) {
      this.router.navigate(['tickets/page/1']);
      return;
    }
    const prevPageNum = this.currentPage;
    this.currentPage = page;

    if (this.paginatedTickets && !this.paginatedTickets.length) {
      this.currentPage = prevPageNum;
    }
    this.router.navigate(['tickets/page', page]);
  }

}
