import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  session: string;

  constructor() {
    const path = window.location.pathname;
    if (path === '/') this.generateSession();
    this.session = path.substr(1);
  }

  async saveScreenshot(imageBlob: Blob) {
    const data = new FormData();
    data.append('screen', imageBlob);
    return await (
      await fetch(
        `http://localhost:3005/server/screenshot?session=${this.session}`,
        {
          method: 'POST',
          body: data,
        }
      )
    ).json();
  }
  async getScreenshots() {
    return await (
      await fetch(
        `http://localhost:3005/server/screenshots?session=${this.session}`
      )
    ).json();
  }
  async deleteScreenshot(id: string) {
    return await (
      await fetch(`http://localhost:3005/server/screenshot?id=${id}`, {
        method: 'DELETE',
      })
    ).json();
  }

  generateSession() {
    const newSession = uuidv4();
    window.location.pathname = newSession;
  }
}
