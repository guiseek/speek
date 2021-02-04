import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { Signaling } from './ports/signaling'
import { SpeekSocket } from './ports/socket'
import { Observable } from 'rxjs'

export class Signal implements Signaling<SpeekPayload> {
  private readonly socket: SpeekSocket

  constructor(socket: SpeekSocket) {
    this.socket = socket
  }

  send(topic: SpeekAction, data: SpeekPayload): void {
    this.socket.send(topic, data)
  }

  on(topic: SpeekAction): Observable<SpeekPayload> {
    return new Observable((subscriber) => {
      this.socket.on(topic, (data: SpeekPayload) => {
        subscriber.next(data)
      })
    })
  }
}
