import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SpeedResponse } from '@speek/core/entity'
import { map } from 'rxjs/operators'
import { timer } from 'rxjs'

@Component({
  selector: 'speek-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  time$ = timer(1000, 0).pipe(map(Date))
  @Input() upload: SpeedResponse
  @Input() download: SpeedResponse
  @Input() connection: SpeedResponse
  @Input() upLoader: boolean
  @Input() downLoader: boolean
  @Output() afterExpand = new EventEmitter<void>()
}
