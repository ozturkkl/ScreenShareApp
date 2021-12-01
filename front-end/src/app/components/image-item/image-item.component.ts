import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Screenshot } from 'src/app/interfaces.module';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css'],
})
export class ImageItemComponent {
  constructor(private storageService: StorageService) {}

  @Input() screenshot: Screenshot = {
    fileName: 'fileName',
    id: 'id',
    timestamp: 0,
    url: 'url',
    session: 'session',
  };
  @Output() screenshotDeleted = new EventEmitter();

  async deleteScreenshot(id: string) {
    await this.storageService.deleteScreenshot(id);
    this.screenshotDeleted.emit();
  }
}
