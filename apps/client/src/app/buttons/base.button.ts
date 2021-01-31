import { Component, Input } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

@Component({ template: '' })
export abstract class BaseButton {
  @Input() color: ThemePalette
  @Input() track: MediaStreamTrack

  onClick() {
    this.track.enabled = !this.track.enabled
  }
}
