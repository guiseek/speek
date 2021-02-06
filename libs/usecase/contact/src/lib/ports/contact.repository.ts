import { PeerContact } from '@speek/core/entity'
import { Observable } from 'rxjs'

export abstract class ContactRepository {
  whoAmI: () => Observable<PeerContact>
}
