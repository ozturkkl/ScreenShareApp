import { Component, Input, OnInit } from '@angular/core';
import { screenshot } from 'src/app/interfaces.module';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  @Input() screenshots: screenshot[] = [];
  constructor() {}

  ngOnInit(): void {}
}
