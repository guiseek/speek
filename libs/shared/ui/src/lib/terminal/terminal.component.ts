import { Component, EventEmitter, HostBinding, Output } from '@angular/core'

export type ToolbarAction = 'close' | 'minimize' | 'fullscreen'
export interface TerminalToolbarEvent {
  terminal: TerminalComponent
  action: ToolbarAction
  event: Event
}

@Component({
  selector: 'speek-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent {
  @HostBinding('class.speek-terminal')
  speekTerminal = true

  @Output() close = new EventEmitter<TerminalToolbarEvent>()
  @Output() minimize = new EventEmitter<TerminalToolbarEvent>()
  @Output() fullscreen = new EventEmitter<TerminalToolbarEvent>()

  onClick(action: ToolbarAction, event: Event) {
    const data = { terminal: this, action, event }
    switch (action) {
      case 'close':
        return this.close.emit(data)
      case 'minimize':
        return this.minimize.emit(data)
      case 'fullscreen':
        return this.fullscreen.emit(data)
    }
  }
}
