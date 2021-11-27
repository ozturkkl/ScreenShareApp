import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { NavComponent } from './components/nav/nav.component';
import { ButtonComponent } from './components/button/button.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImageItemComponent } from './components/image-item/image-item.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    NavComponent,
    ButtonComponent,
    ImageListComponent,
    ImageItemComponent,
    WelcomeComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
