import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ThemePalette } from '@angular/material/core'

@Component({
  selector: 'speek-call-button',
  template: `
    <button
      mat-fab
      [color]="!active ? (active ? 'warn' : color) : 'warn'"
      (click)="clicked.emit()"
    >
      <mat-icon>{{ active ? 'call_end' : 'call' }}</mat-icon>
    </button>
  `,
})
export class CallButton {
  @Input() active: boolean = false
  @Input() color: ThemePalette = 'primary'
  @Output() clicked = new EventEmitter<void>()
}
