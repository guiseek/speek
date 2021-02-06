import { ContactRepository } from './ports/contact.repository'
import { PeerContact, UseCase } from '@speek/core/entity'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

export class WhoAmI implements UseCase<void, PeerContact> {
  constructor(private readonly repository: ContactRepository) {}

  execute(params: void): Observable<PeerContact> {
    const whoAmI = this.repository.whoAmI()
    return whoAmI.pipe(map((contact) => ({ id: contact.id, me: true })))
  }
}
