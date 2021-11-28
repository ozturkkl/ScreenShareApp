import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(storageService: StorageService) {}

  showWelcome = true;
  showGallery = false;
  showCanvas = false;

  onAdd() {
    this.showCanvas = true;
    this.showWelcome = false;
    this.showGallery = false;
  }
  onGallery() {
    this.showGallery = true;
    this.showCanvas = false;
    this.showWelcome = false;
  }
}
