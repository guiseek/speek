import { BaseButton } from '../base.button'
import { Component } from '@angular/core'

@Component({
  selector: 'speek-video-button',
  template: `
    <button mat-fab [color]="color" [disabled]="!active" (click)="onClick()">
      <mat-icon>{{ track?.enabled ? 'videocam' : 'videocam_off' }}</mat-icon>
    </button>
  `,
})
export class VideoButton extends BaseButton {}
