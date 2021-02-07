import { Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'speek-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @HostBinding('class.speek-toolbar')
  speekToolbar = true

  @Input('x-align')
  xAlign: 'start' | 'center' | 'end' = 'center'
}
