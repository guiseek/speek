import { DrawerService } from './../drawer.service'
import { PickContacts } from '@speek/usecase/contact'
import { Component, OnInit } from '@angular/core'
import { TerminalToolbarEvent } from '@speek/shared/ui'

@Component({
  selector: 'speek-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  providers: [PickContacts],
})
export class IntroComponent implements OnInit {
  contacts = []
  constructor(readonly useCase: PickContacts, readonly drawer: DrawerService) {}

  ngOnInit(): void {
    // this.useCase.execute().then((contacts) => (this.contacts = contacts))
  }

  onClicked(data: TerminalToolbarEvent) {
    console.log(data)
  }
  onClose(data: TerminalToolbarEvent) {
    console.log(data)
  }
}
