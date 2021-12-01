import { Component } from '@angular/core';
import { Screenshot } from 'src/app/interfaces.module';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  screenshots: Screenshot[] = [];

  showWelcome = false;
  showGallery = true;
  showCanvas = false;

  constructor(private storageService: StorageService) {
    this.onGallery();
  }

  onAdd() {
    this.showCanvas = true;
    this.showWelcome = false;
    this.showGallery = false;
  }
  async onGallery() {
    this.screenshots = (await this.storageService.getScreenshots()).screenshots;
    if (this.screenshots.length === 0) return this.onWelcome();
    this.showGallery = true;
    this.showCanvas = false;
    this.showWelcome = false;
  }
  onWelcome() {
    this.showGallery = false;
    this.showCanvas = false;
    this.showWelcome = true;
  }
  onDelete() {
    this.showGallery = false;
    this.onGallery();
  }
}
