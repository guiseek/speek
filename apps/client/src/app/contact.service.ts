import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
const p = new RegExp(a.split('').join('|'), 'g')

export function dropSpecialChars(str: string) {
  return str.toString().replace(p, (c) => b.charAt(a.indexOf(c)))
}

export function clearToSearch(str: string) {
  return dropSpecialChars(str)
    .replace(/[^\w\s]|_/g, '')
    .toLowerCase()
}

export interface Contact {
  id: number
  first_name: string
  last_name: string
  email: string
  country: string
  modified: string
  vip: boolean
}

const find = (str: string, q: string) => {
  return clearToSearch(str).indexOf(clearToSearch(q)) > -1
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _contacts = new BehaviorSubject<Contact[]>([])
  readonly contacts$ = this._contacts.asObservable()

  constructor(private _http: HttpClient) {}

  loadContacts(q: string = null): void {
    if (!!this._contacts.value.length) {
      let contacts: Contact[]
      if (!!q) {
        contacts = this.search(q)
      } else {
        contacts = this._contacts.value
      }
      this._contacts.next(contacts)
    } else {
      this.getContacts().subscribe((contacts) => this._contacts.next(contacts))
    }
  }

  private getContacts() {
    return this._http.get<Contact[]>('/assets/data/people.json')
  }

  private search(q: string) {
    return this._contacts.getValue().filter((c) => {
      return find(c.first_name, q) || find(c.last_name, q) || find(c.email, q)
    })
  }
}
