import { Component, Input } from '@angular/core'
import { ThemePalette } from '@angular/material/core'

@Component({ template: '' })
export abstract class BaseButton {
  @Input() color: ThemePalette
  @Input() track: MediaStreamTrack
  @Input() active: boolean = false

  onClick() {
    this.track.enabled = !this.track.enabled
  }
}
