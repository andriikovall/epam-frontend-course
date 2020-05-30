import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-ava',
  templateUrl: './user-ava.component.html',
  styleUrls: ['./user-ava.component.scss']
})
export class UserAvaComponent implements OnInit {

  private defaultAvaUrl = '/assets/img/user-ava-placeholder.jpg';

  @Input() src: string | Blob = this.defaultAvaUrl;
  @Input() size: string = '1em';

  constructor() { }

  ngOnInit() {
    this.src = this.src || this.defaultAvaUrl;
  }

}
