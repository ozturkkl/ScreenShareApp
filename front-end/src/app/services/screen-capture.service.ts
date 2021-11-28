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
  screenShot: any = null;

  constructor() {}

  async changeScreen() {
    this.destroyCapture();
    this.streamBuffer = await this.startCapture(gdmOptions);
    return this.streamBuffer;
  }

  async getBuffer() {
    if (
      !this.streamBuffer ||
      this.streamBuffer.getVideoTracks()[0].readyState === 'ended'
    )
      this.streamBuffer = await this.startCapture(gdmOptions);
    return this.streamBuffer;
  }

  async captureImage() {
    const videoTrack = this.streamBuffer?.getVideoTracks()[0];
    if (!videoTrack || videoTrack?.readyState === 'ended') {
      this.streamBuffer = null;
      return null;
    }
    const imageCapture = new ImageCapture(videoTrack);
    return await imageCapture.grabFrame();
  }

  async startCapture(displayMediaOptions: object) {
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
