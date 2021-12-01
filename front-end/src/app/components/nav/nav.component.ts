import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Output() addRequest = new EventEmitter();
  @Output() galleryRequest = new EventEmitter();

  onAdd(): void {
    this.addRequest.emit();
  }
  onGallery(): void {
    this.galleryRequest.emit();
  }
}
