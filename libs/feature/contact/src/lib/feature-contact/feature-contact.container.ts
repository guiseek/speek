import { Component, OnInit } from '@angular/core'
import { PeerContact, UserContact } from '@speek/core/entity'
import { ContactRepository, WhoAmI } from '@speek/usecase/contact'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'feature-contact',
  templateUrl: './feature-contact.container.html',
  styleUrls: ['./feature-contact.container.scss'],
})
export class FeatureContactContainer implements OnInit {
  whoAmI: WhoAmI

  contact$: Observable<PeerContact> = of({ id: '00000000', me: false })
  contacts$: Observable<UserContact[]> = of([])
  constructor(readonly repository: ContactRepository) {
    this.whoAmI = new WhoAmI(repository)
  }

  ngOnInit(): void {
    this.contact$ = this.whoAmI.execute()
  }
}
