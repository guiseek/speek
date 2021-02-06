import { IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator'
import * as clc from 'cli-color'
import { ContactCalledPeerEvent } from '../impl/contact-called-peer.event'

@EventsHandler(ContactCalledPeerEvent)
export class ContactCalledPeerHandler
  implements IEventHandler<ContactCalledPeerEvent> {
  handle(event: ContactCalledPeerEvent) {
    console.log(clc.greenBright('ContactCalledPeerEvent...'))
  }
}
