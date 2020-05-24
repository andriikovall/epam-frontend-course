import { Component, OnInit, Input } from '@angular/core';
import { GalleryItem } from 'src/app/models/helpers/galleryItem';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() items: GalleryItem[] = [];
  @Input() itemSize: number = 300;
  @Input() gap: number = 10;

  public offset: number = 0;

  constructor() { }

  ngOnInit() {
  }

  onLeft() {
    this.offset -= (this.itemSize + this.gap);
    if (this.offset < - (this.items.length - 1) * (this.itemSize + this.gap)) {
      this.offset += this.itemSize + this.gap;
    }
  }

  onRight() {
    this.offset += (this.itemSize + this.gap);
    if (this.offset > window.innerWidth - (this.gap + this.itemSize + 20)) {
      this.offset -= this.itemSize + this.gap;
    }
  }

}
