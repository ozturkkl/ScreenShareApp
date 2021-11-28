import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
