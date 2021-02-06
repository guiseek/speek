import { Peer } from './storage/peer.storage'
import { NgModule } from '@angular/core'
import { ContactService } from './repository/contact.service'
import { ContactRepository } from '@speek/usecase/contact'
import { PeerStorage } from '@speek/usecase/peer'

@NgModule({
  providers: [
    { provide: PeerStorage, useClass: Peer },
    { provide: ContactRepository, useClass: ContactService },
  ],
})
export class AdapterDataAccessModule {}
