import { Component, ViewChild } from '@angular/core';
import { ScreenCaptureService } from 'src/app/services/ScreenCapture.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  streamBuffer: MediaStream | null = null;
  constructor(private screenCaptureService: ScreenCaptureService) {}

  @ViewChild('videoElm') videoElm: any;

  async ngAfterViewInit() {
    this.streamBuffer = await this.screenCaptureService.getBuffer();
    this.updatePlayer();
  }

  async changeScreen() {
    this.streamBuffer = null;
    this.streamBuffer = await this.screenCaptureService.changeScreen();
    this.updatePlayer();
  }

  updatePlayer() {
    const video = <HTMLVideoElement>this.videoElm.nativeElement;
    video.srcObject = this.streamBuffer;
  }
}
