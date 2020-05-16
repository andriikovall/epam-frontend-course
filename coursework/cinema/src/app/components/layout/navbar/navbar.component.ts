import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError, NavigationCancel } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ViewportScroller } from '@angular/common';
import { BaseService } from 'src/app/services/base.service';

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
              public baseService: BaseService) { }

  ngOnInit() {
    this.routerEventSubscription =
      this.router.events
        .subscribe((ev) => {
          if (ev instanceof NavigationStart) {
            this.navigationLoading = true;
          }
          if (ev instanceof NavigationEnd ||
              ev instanceof NavigationCancel ||
              ev instanceof NavigationError) {
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

  onLogout() {
    if (confirm('Dou you want to log out?')) {
      this.authService.logout();
      this.toggleDropdown();
    }
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }


}
