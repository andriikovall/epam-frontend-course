import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isNavbarExpanded = false;
  public isDropdoenExpanded = false;
  public navigationLoading = false;

  private routerEventSubscription: Subscription;

  constructor(private router: Router,
              public authService: AuthService,
              private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.routerEventSubscription =
      this.router.events
        .subscribe((ev) => {
          if (ev instanceof NavigationStart) {
            this.navigationLoading = true;
          }
          if (ev instanceof NavigationEnd) {
            this.isNavbarExpanded = false;
            this.navigationLoading = false;
            this.scrollToTop();
          }
        });
  }

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  toggleDropdown() {
    this.isDropdoenExpanded = !this.isDropdoenExpanded;
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

  onLogout() {
    if (confirm('Dou you want to log out?')) {
      this.authService.logout();
      this.toggleDropdown();
    }
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}
