import { UseCase, UserContact, Grouped } from '@speek/core/entity'
import { ContactRepository } from './ports/contact.repository'
import { groupByLetter } from './utils/group-by-letter'
import { find } from '@speek/util/format'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

export class LoadContacts implements UseCase<string, Grouped<UserContact>[]> {
  constructor(private readonly repository: ContactRepository) {}

  execute(params = ''): Observable<Grouped<UserContact>[]> {
    const group = (list: UserContact[]) => {
      const search = (c: UserContact) => find(c.name, params)

      const contacts = !!params ? list.filter(contact => search(contact)) : list

      return groupByLetter<UserContact>(contacts, 'name')
    }
    return this.repository.loadContacts().pipe(map(list => group(list)))
  }
}
