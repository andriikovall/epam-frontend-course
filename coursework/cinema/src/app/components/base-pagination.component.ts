import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationEvent } from '../models/helpers/paginationEvent';
import { BaseComponent } from './base.component';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-base-pagination',
  template: '',
})
export class BasePaginationComponent extends BaseComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public router: Router,
              private pageniationService: PaginationService) {
                super();
  }

  public currentPage: number = 1;
  public itemsPerPage = 5;

  protected get limit(): number {
    return this.itemsPerPage;
  }

  protected get offset(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  ngOnInit() {
    const currPage = parseInt(this.route.snapshot.paramMap.get('pageNum'));
    this.setCurrentPage(currPage);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.router.navigate([...this.pageniationService.routePrefix.value, 'page', page]);
  }

  onPageChanged(event: PaginationEvent) {
    this.setCurrentPage(event.currentPage);
  }

}
