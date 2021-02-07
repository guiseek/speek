import { Grouped, UseCase, UserContact } from '@speek/core/entity'
import { groupByLetter } from './utils/group-by-letter'
import { Observable, of } from 'rxjs'

export class GroupContacts
  implements UseCase<UserContact[], Grouped<UserContact>[]> {
  execute(contacts: UserContact[]): Observable<Grouped<UserContact>[]> {
    return of(groupByLetter<UserContact>(contacts, 'name'))
  }
}
