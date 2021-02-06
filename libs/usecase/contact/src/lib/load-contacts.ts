import { UseCase, UserContact } from '@speek/core/entity'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ContactRepository } from './ports/contact.repository'
import { groupByLetter, Grouped } from './utils/group-by-letter'

export class LoadContacts implements UseCase<void, Grouped<UserContact>[]> {
  constructor(private readonly repository: ContactRepository) {}

  execute(params: void): Observable<Grouped<UserContact>[]> {
    const group = (contacts: UserContact[]) => {
      return groupByLetter<UserContact>(contacts, 'name')
    }
    return this.repository.loadContacts().pipe(map(group))
  }
}
