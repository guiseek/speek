import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserContact } from '@speek/core/entity'
import { find } from '@speek/util/format'
import { BehaviorSubject } from 'rxjs'
import { GetMyContact } from '@speek/usecase/contact'

@Injectable()
export class ContactService {
  private _contacts = new BehaviorSubject<UserContact[]>([])
  readonly contacts$ = this._contacts.asObservable()
  private _allContacts: UserContact[] = []

  private getMyContact: GetMyContact

  constructor(private _http: HttpClient) {
    this.getMyContact = new GetMyContact(_http)
  }

  loadContacts(q: string = ''): void {
    this.getContacts().subscribe((contacts) => {
      if (!this._allContacts.length) {
        this._allContacts = contacts
      }
      this._contacts.next(this.search(q))
    })
  }

  private setContacts(contacts: UserContact[] = []) {}

  getContact() {
    return this.getMyContact.execute()
    // return this._http.get<UserContact>('/api/contact')
  }

  callContactPeer(id: string, peerId: string) {
    return this._http.post(`/api/contact/${id}/call`, { peerId })
  }

  private getContacts() {
    return this._http.get<UserContact[]>('/assets/data/contacts.json')
  }

  private search(q: string) {
    return this._allContacts.filter((c) => {
      return find(c.name, q)
    })
  }
}
