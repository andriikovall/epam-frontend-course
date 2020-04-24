import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/models/breadCrumbItem';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-breadcramb',
  templateUrl: './breadcramb.component.html',
  styleUrls: ['./breadcramb.component.scss']
})
export class BreadcrambComponent implements OnInit {

  public items: BreadcrumbItem[];

  constructor(private route: Router) { }

  ngOnInit() {
    console.log('init');
    this.route.events.pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe((ev) => console.log(ev));
  }

}
