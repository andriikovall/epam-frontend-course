import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-ava',
  templateUrl: './user-ava.component.html',
  styleUrls: ['./user-ava.component.scss']
})
export class UserAvaComponent implements OnInit {

  private defaultAvaUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  @Input() src: string | Blob = this.defaultAvaUrl;
  @Input() size: string = '1em';

  constructor() { }

  ngOnInit() {
    this.src = this.src || this.defaultAvaUrl;
  }

}
