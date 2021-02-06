import { PeerContact, UserContact } from '@speek/core/entity'
import { Observable } from 'rxjs'

export abstract class ContactRepository {
  abstract contacts$: Observable<UserContact[]>
  abstract whoAmI(): Observable<PeerContact>
  abstract whoIsOutThere(peer: PeerContact): Observable<PeerContact[]>
  abstract loadContacts(): Observable<UserContact[]>
  abstract query(q?: string): void
}
