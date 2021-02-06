import {
  WhoAmI,
  WhoIsOutThere,
  ContactRepository,
} from '@speek/usecase/contact'
import { Component, OnInit } from '@angular/core'
import { PeerContact, UserContact } from '@speek/core/entity'
import { PeerStorage } from '@speek/usecase/peer'
import { Observable, of } from 'rxjs'
import { SpeekDrawer } from '@speek/shared/ui'

@Component({
  selector: 'feature-contact',
  templateUrl: './feature-contact.container.html',
  styleUrls: ['./feature-contact.container.scss'],
})
export class FeatureContactContainer implements OnInit {
  whoAmI: WhoAmI
  whoIsOutThere: WhoIsOutThere

  contact$: Observable<PeerContact>
  contacts$: Observable<UserContact[]> = of([])
  peers$: Observable<PeerContact[]> = of([])
  constructor(
    readonly repository: ContactRepository,
    readonly drawer: SpeekDrawer,
    readonly peer: PeerStorage
  ) {
    this.whoAmI = new WhoAmI(this.repository)
    this.whoIsOutThere = new WhoIsOutThere(this.repository)
  }

  ngOnInit(): void {
    if (this.peer.getStoredValue()) {
      this.contact$ = of(this.peer.getStoredValue())
      this.peers$ = this.whoIsOutThere.execute(this.peer.getStoredValue())
    } else {
      this.contact$ = this.whoAmI.execute()
      this.peer.onUpdate.subscribe((peer: PeerContact) => {
        this.peers$ = this.whoIsOutThere.execute(peer)
      })
    }
  }

  store(id: string) {
    this.peer.store(new PeerContact(id, true))
  }
}
