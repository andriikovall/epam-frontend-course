import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isNavbarExpanded = false;
  private routerEventSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.routerEventSubscription =
      this.router.events.pipe(filter(ev => ev instanceof NavigationEnd))
        .subscribe(() => this.isNavbarExpanded = false);
  }

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

}
