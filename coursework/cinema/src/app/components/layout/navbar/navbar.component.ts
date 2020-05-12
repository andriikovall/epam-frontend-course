import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isNavbarExpanded = false;
  public isDropdoenExpanded = false;

  private routerEventSubscription: Subscription;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.routerEventSubscription =
      this.router.events.pipe(filter(ev => ev instanceof NavigationEnd))
        .subscribe(() => this.isNavbarExpanded = false);
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

}
