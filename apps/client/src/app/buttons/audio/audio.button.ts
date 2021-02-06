import { BaseButton } from '../base.button'
import { Component } from '@angular/core'
@Component({
  selector: 'speek-audio-button',
  template: `
    <button mat-fab [color]="color" [disabled]="!active" (click)="onClick()">
      <mat-icon>{{ track?.enabled ? 'volume_up' : 'volume_off' }}</mat-icon>
    </button>
  `,
})
export class AudioButton extends BaseButton {}
