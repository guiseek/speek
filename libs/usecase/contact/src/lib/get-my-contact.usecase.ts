import { PeerContact, UseCase } from '@speek/core/entity'
import { Observable } from 'rxjs'

export class GetMyContact implements UseCase<void, PeerContact> {
  constructor(
    private http: { get<PeerContact>(path: string): Observable<PeerContact> }
  ) {}
  execute(params: void): Observable<PeerContact> {
    return this.http.get<PeerContact>('/api/contact')
  }
}
