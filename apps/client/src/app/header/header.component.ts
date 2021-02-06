import { NetworkService } from '../network.service'
import { Component } from '@angular/core'
import { map } from 'rxjs/operators'
import { timer } from 'rxjs'

@Component({
  selector: 'speek-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  time$ = timer(1000, 0).pipe(map(Date))

  upload$ = this.network.upload$
  download$ = this.network.download$
  connection$ = this.network.connection$

  constructor(readonly network: NetworkService) {}

  networnState() {
    this.network.loadUp()
    this.network.loadDown()
  }
}
