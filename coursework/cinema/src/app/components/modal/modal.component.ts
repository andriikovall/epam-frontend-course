import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = '';
  @Input() show: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';


  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  onClose() {

  }


}
