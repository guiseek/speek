import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { AudioButton } from './audio/audio.button'
import { VideoButton } from './video/video.button'
import { CallButton } from './call/call.button'

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [AudioButton, VideoButton, CallButton],
  exports: [AudioButton, VideoButton, CallButton]
})
export class ButtonsModule {}
