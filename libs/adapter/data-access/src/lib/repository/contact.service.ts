import { HttpClient } from '@angular/common/http'
import { ContactRepository } from '@speek/usecase/contact'
import { PeerContact, UserContact } from '@speek/core/entity'
import { BehaviorSubject, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { find } from '@speek/util/format'

@Injectable({ providedIn: 'root' })
export class ContactService implements ContactRepository {
  private _contacts = new BehaviorSubject<UserContact[]>([])
  readonly contacts$ = this._contacts.asObservable()
  private _allContacts: UserContact[] = []

  constructor(private http: HttpClient) {}

  whoIsOutThere() {
    return this.http.get<PeerContact>('/api/contact/public')
  }

  whoAmI(): Observable<PeerContact> {
    return this.http.get<PeerContact>('/api/contact')
  }

  query(q?: string): void {
    this.loadContacts().subscribe((contacts) => {
      if (!this._allContacts.length) {
        this._allContacts = contacts
      }
      this._contacts.next(this.search(q))
    })
  }

  loadContacts() {
    return this.http.get<UserContact[]>('/assets/data/contacts.json')
  }

  private search(q: string) {
    return this._allContacts.filter((c) => {
      return find(c.name, q)
    })
  }
}
