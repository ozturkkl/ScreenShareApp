import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Screenshot } from 'src/app/interfaces.module';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  @Input() screenshots: Screenshot[] = [];
  @Output() screenshotDeleted = new EventEmitter();

  onDelete() {
    this.screenshotDeleted.emit();
  }
}
