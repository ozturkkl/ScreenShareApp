import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor() {}

  @Output() addRequest = new EventEmitter();
  @Output() galleryRequest = new EventEmitter();

  ngOnInit(): void {}

  onAdd(): void {
    this.addRequest.emit();
  }
  onGallery(): void {
    this.galleryRequest.emit();
  }
}
