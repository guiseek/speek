import { HttpClient } from '@angular/common/http'
import { ContactRepository } from '@speek/usecase/contact'
import { PeerContact } from '@speek/core/entity'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ContactService implements ContactRepository {
  constructor(private http: HttpClient) {}

  whoAmI(): Observable<PeerContact> {
    return this.http.get<PeerContact>('/api/contact')
  }
}
