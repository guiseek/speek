import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { find } from '@speek/util/format'
import { BehaviorSubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'

export interface Contact {
  id: number
  name: string
  tel?: { type: string; value: string }[]
  first_name: string
  last_name: string
  email: string
  country: string
  modified: string
  vip: boolean
}

@Injectable()
export class ContactService {
  private _contacts = new BehaviorSubject<Contact[]>([])
  readonly contacts$ = this._contacts.asObservable()

  constructor(private _http: HttpClient) {}

  loadContacts(q: string = null): void {
    if (!!this._contacts.value.length) {
      this._contacts.next(!!q ? this.search(q) : this._contacts.value)
    } else {
      this.getContacts().subscribe((contacts) => this._contacts.next(contacts))
    }
  }

  private getContacts() {
    return this._http.get<Contact[]>('/assets/data/friends.json').pipe(
      tap((contacts) => {
        return contacts.slice(0, 2).filter((contact) => {
          let c = Object.entries(contact).map(([key, val]) => {
            let tel = []
            if (!!val.length) {
              let telObj = { type: '', value: '' }
              if (key.startsWith('Phone') && key.endsWith('Type')) {
                telObj.type = key.toLowerCase()
                telObj.value = val
                tel.push(telObj)
              }
              contact.tel = tel

              return {
                [key]: val,
                tel,
              }
            }
          })
          console.log(c)
        })
      })
    )
  }

  private search(q: string) {
    return this._contacts.getValue().filter((c) => {
      return find(c.name, q)
      // return find(c.name, q) || find(c.email, q)
    })
  }
}
