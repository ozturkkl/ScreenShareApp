import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  instance: string;

  constructor(private http: HttpClient) {
    const path = window.location.pathname;
    if (path === '/') this.generateInstance();
    this.instance = path.substr(1);

    this.getScreenshots().subscribe((data) => {
      console.log(data);
    });
    this.postScreenshot().subscribe((data) => {
      console.log(data);
    });
  }

  async saveScreenshot(imageBitmap: ImageBitmap) {
    console.log(imageBitmap);
  }
  getScreenshots() {
    return this.http.get('http://localhost:3005/server/screenshots');
  }
  postScreenshot() {
    return this.http.post('http://localhost:3005/server/screenshot', {
      screenshot: 'data',
    });
  }

  generateInstance() {
    const newInstance = uuidv4();
    window.location.pathname = newInstance;
  }
}
