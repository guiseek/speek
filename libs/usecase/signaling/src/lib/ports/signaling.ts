import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { Observable } from 'rxjs'

export interface Signaling<T = SpeekPayload> {
  send(topic: SpeekAction, data: SpeekPayload): void
  on(topic: SpeekAction): Observable<T>
}
