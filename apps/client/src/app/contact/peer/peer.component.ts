import {
  getMyPeerContact,
  getMyPeerContactSuccess,
} from './../+state/peer.actions'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'speek-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.scss'],
})
export class PeerComponent implements OnInit {
  contact$ = this.store.select(getMyPeerContactSuccess)
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getMyPeerContact())
  }
}
