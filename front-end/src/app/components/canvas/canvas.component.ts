import { Component, ViewChild } from '@angular/core';
import { ScreenCaptureService } from 'src/app/services/ScreenCapture.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  streamBuffer: MediaStream | null = null;
  imageBitmap: ImageBitmap | null = null;
  constructor(private screenCaptureService: ScreenCaptureService) {}

  @ViewChild('videoElm') videoElm: any;
  @ViewChild('canvasElm') canvasElm: any;

  async ngAfterViewInit() {
    this.streamBuffer = await this.screenCaptureService.getBuffer();
    this.updatePlayer();
  }

  async changeScreen() {
    this.streamBuffer = null;
    this.discardCapture();
    this.streamBuffer = await this.screenCaptureService.changeScreen();
    this.updatePlayer();
  }

  async captureImage() {
    this.imageBitmap = await this.screenCaptureService.captureImage();
    const canvasElm = <HTMLCanvasElement>this.canvasElm.nativeElement;
    if (this.imageBitmap && canvasElm)
      this.drawCanvas(canvasElm, this.imageBitmap);
  }

  discardCapture() {
    this.imageBitmap = null;
  }
  saveCapture() {
    console.log('saveCapture');
  }

  updatePlayer() {
    const video = <HTMLVideoElement>this.videoElm.nativeElement;
    if (video) video.srcObject = this.streamBuffer;
  }

  drawCanvas(canvas: HTMLCanvasElement, img: ImageBitmap) {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height);
  }
}
