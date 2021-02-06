import { PeerContact, UseCase } from '@speek/core/entity'
import { Observable } from 'rxjs'

export class CallPeer implements UseCase<string, PeerContact> {
  constructor(
    private http: { get<PeerContact>(path: string): Observable<PeerContact> }
  ) {}
  execute(params: string): Promise<PeerContact> {
    return this.http.get<PeerContact>('/api/contact').toPromise()
  }
}
