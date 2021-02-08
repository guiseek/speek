import { UserContact, PeerContact } from '@speek/core/entity';
import { Observable, of } from 'rxjs';
import { ContactRepository } from './ports/contact.repository';
import { WhoAmI } from './who-am-i';

class Repository extends ContactRepository {
  contacts$: Observable<UserContact[]>;
  whoAmI(): Observable<PeerContact> {
    return of()
  }
  whoIsOutThere(peer: PeerContact): Observable<PeerContact[]> {
    return of()
  }
  loadContacts(): Observable<UserContact[]> {
    return of()
  }
  query(q?: string): void {

  }

}

describe('WhoAmI', () => {
  it('should create an instance', () => {
    expect(new WhoAmI(new Repository())).toBeTruthy();
  });
});
