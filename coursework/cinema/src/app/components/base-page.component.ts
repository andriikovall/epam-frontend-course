import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  template: '',
})
export class BasePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

}
