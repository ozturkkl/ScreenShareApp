import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ScreenCaptureService } from 'src/app/services/screen-capture.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  streamBuffer: MediaStream | null = null;
  imageBitmap: ImageBitmap | null = null;
  constructor(
    private screenCaptureService: ScreenCaptureService,
    private storageService: StorageService
  ) {}

  @ViewChild('videoElm') videoElm: any;
  @ViewChild('canvasElm') canvasElm: any;
  @Output() galleryRequest = new EventEmitter();

  async ngAfterViewInit() {
    this.streamBuffer = await this.screenCaptureService.getBuffer();
    this.updatePlayer(this.videoElm.nativeElement);
  }

  async changeScreen() {
    this.streamBuffer = null;
    this.discardCapture();
    this.streamBuffer = await this.screenCaptureService.changeScreen();
    this.updatePlayer(this.videoElm.nativeElement);
  }

  async captureImage() {
    this.imageBitmap = await this.screenCaptureService.captureImage();
    this.drawCanvas(this.canvasElm.nativeElement, this.imageBitmap);
    if (!this.imageBitmap) this.ngAfterViewInit();
  }
  discardCapture() {
    this.imageBitmap = null;
  }

  async saveCapture() {
    const blob = await this.getBlob(this.canvasElm.nativeElement);
    if (blob) {
      await this.storageService.saveScreenshot(blob);
      this.galleryRequest.emit();
    } else {
      console.error('Failed to get image blob...');
    }
  }

  updatePlayer(video: HTMLVideoElement) {
    if (video) video.srcObject = this.streamBuffer;
  }

  drawCanvas(canvas: HTMLCanvasElement, img: ImageBitmap | null) {
    if (!canvas || !img) return;
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height);
  }

  getBlob(canvas: HTMLCanvasElement) {
    return new Promise<Blob | null>((res) => {
      canvas.toBlob((blob) => res(blob));
    });
  }
}
