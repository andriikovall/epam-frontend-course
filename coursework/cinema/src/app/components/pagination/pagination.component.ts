import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PaginationEvent } from 'src/app/models/helpers/paginationEvent';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent extends BaseComponent implements OnInit {

  @Input() total: number = 0;
  @Input() pageSize: number = 0;
  @Input() initialPage: number = 1;

  @Output() pageChanged = new EventEmitter<PaginationEvent>();

  public getPagesNumbersList(): number[] {
    const length = Math.ceil(this.total / this.pageSize);
    return new Array(length).fill(1).map((_, index) => index + 1);
  }

  public currentPage: number;

  constructor() {
    super();
  }

  ngOnInit() {
    this.currentPage = this.initialPage;
    if (!this.isValidPage(this.currentPage)) {
      this.onPageSelected(1);
    }
  }

  trackByFn(index, item: number) {
    return item;
  }

  onPageSelected(page: number) {
    if(this.isValidPage(page)) {
      this.changePage(page);
    }
  }

  onNextPage() {
    if (this.isValidPage(this.currentPage + 1)) {
      this.changePage(this.currentPage + 1);
    }
  }

  onPrevPage() {
    if (this.isValidPage(this.currentPage - 1)) {
      this.changePage(this.currentPage - 1);
    }
  }

  private changePage(page: number) {
    this.currentPage = page;
    const limit = this.pageSize;
    const offset = (this.currentPage - 1) * this.pageSize;
    this.pageChanged.emit({ currentPage: page, limit, offset });
  }

  private isValidPage(page: number): boolean {
    return !isNaN(page) &&
            page >= 1 &&
            page * this.pageSize < this.total + this.pageSize;
  }
}
