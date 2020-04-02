import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSidebarOpened = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
