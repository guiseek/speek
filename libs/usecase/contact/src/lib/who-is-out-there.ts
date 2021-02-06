import { UseCase, PeerContact } from '@speek/core/entity';
import { Observable } from 'rxjs';
import { ContactRepository } from './ports/contact.repository';
export class WhoIsOutThere implements UseCase<PeerContact, PeerContact[]> {
  constructor(private readonly repository: ContactRepository) {}

  execute(params: PeerContact): Observable<PeerContact[]> {
    return this.repository.whoIsOutThere(params)
  }
}
