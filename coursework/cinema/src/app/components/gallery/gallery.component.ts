import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GalleryItem } from 'src/app/models/helpers/galleryItem';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  private direction: 'left' | 'right' = 'right';
  private moovingController: BehaviorSubject<any>;
  private moovingInterval = 5000;

  @ViewChild('gallery', {static: false})
    private gallery: ElementRef;

  constructor() { }

  ngOnInit() {
    this.moovingController = new BehaviorSubject(null);
    this.moovingController.pipe(
      debounceTime(this.moovingInterval)
      ).subscribe(ev => {
      const shouldChangeDirection = !(this.direction == 'right' ?
      this.onRight() :
      this.onLeft());
      if (shouldChangeDirection) {
        if (this.direction == 'right') {
          this.direction = 'left';
        } else {
          this.direction = 'right';
        }
      }
    });
  }

  onLeft(): boolean {
    this.moovingController.next(null);
    this.offset += (this.itemSize + this.gap);
    if (this.offset >= (this.gap + this.itemSize)) {
      this.offset -= this.itemSize + this.gap;
      return false;
    }
    this.direction = 'left';
    return true;
  }

  onRight(): boolean {
    this.moovingController.next(null);
    this.offset -= (this.itemSize + this.gap);
    // a piece of a shitty code calculations, sorry, but this works =)
    if (this.offset < - ((this.items.length) * (this.itemSize + this.gap))
                      + (this.gallery.nativeElement as HTMLElement).offsetWidth - this.itemSize) {
      this.offset += this.itemSize + this.gap;
      return false;
    }

    this.direction = 'right';
    return true;
  }

}
