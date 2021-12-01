import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { screenshot } from 'src/app/interfaces.module';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  @Input() screenshots: screenshot[] = [];
  @Output() screenshotDeleted = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.screenshotDeleted.emit();
  }
}
