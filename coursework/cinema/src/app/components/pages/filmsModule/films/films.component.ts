import { Component, OnInit } from '@angular/core';
import { BasePaginationComponent } from 'src/app/components/base-pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { Film } from 'src/app/models/film';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent extends BasePaginationComponent implements OnInit {

  public itemsPerPage = 4;
  public filmsLoading: boolean;

  public get paginatedFilms(): Film[] {
    return this.films.slice(this.offset, this.limit + this.offset);
  }


  public films: Film[];

  constructor(public route: ActivatedRoute,
              public router: Router,
              private filmsService: FilmsService,
              private paginationService: PaginationService) {
    super(route, router, paginationService);
    this.paginationService.routePrefix.next(['films']);
  }

  ngOnInit() {
    this.filmsLoading = true;
    this.filmsService.getFilms().subscribe(films => {
      this.films = films;
      this.filmsLoading = false;
    });
    super.ngOnInit();
  }

}
