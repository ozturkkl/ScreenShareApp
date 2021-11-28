import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async saveScreenshot(imageBitmap: ImageBitmap) {
    console.log(imageBitmap);
  }
}
