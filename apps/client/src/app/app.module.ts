import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RemoteTodoStore } from './store'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { Database } from './database';
import { AudioButton } from './buttons/audio/audio.button';
import { VideoButton } from './buttons/video/video.button';
import { CallButton } from './buttons/call/call.button';
import { VideoStream } from './streams/video/video.stream'

@NgModule({
  declarations: [AppComponent, AudioButton, VideoButton, CallButton, VideoStream],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [RemoteTodoStore, Database],
  bootstrap: [AppComponent],
})
export class AppModule {}
