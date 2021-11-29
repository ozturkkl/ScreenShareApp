import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { screenshot } from 'src/app/interfaces.module';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css'],
})
export class ImageItemComponent implements OnInit {
  @Input() screenshot: screenshot = {
    fileName: 'fileName',
    id: 'id',
    timestamp: 0,
    url: 'url',
    session: 'session',
  };
  @Output() screenshotDeleted = new EventEmitter();

  constructor(private storageService: StorageService) {}

  deleteScreenshot(id: string) {
    this.storageService.deleteScreenshot(id);
  }

  ngOnInit(): void {}
}
