import { Injectable } from '@angular/core';

const gdmOptions = {
  video: {
    cursor: 'never',
  },
  audio: false,
};

@Injectable({
  providedIn: 'root',
})
export class ScreenCaptureService {
  streamBuffer: MediaStream | null = null;

  constructor() {}

  async changeScreen() {
    this.destroyCapture();
    this.streamBuffer = await this.startCapture(gdmOptions);
    return this.streamBuffer;
  }

  async getBuffer() {
    if (!this.streamBuffer)
      this.streamBuffer = await this.startCapture(gdmOptions);
    return this.streamBuffer;
  }

  async startCapture(displayMediaOptions: any) {
    let captureStream = null;

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
    } catch (err) {
      console.error('Error: ' + err);
    }
    return captureStream;
  }

  destroyCapture() {
    let tracks = this.streamBuffer?.getTracks() || [];
    tracks.forEach((track) => track.stop());
    this.streamBuffer = null;
  }
}
