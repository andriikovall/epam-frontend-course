import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [BaseService]
})
export class FooterComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit() {
  }

}
