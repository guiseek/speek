import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator'
import { ContactCalledPeerEvent } from '../impl/contact-called-peer.event'
import { IEventHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'

@EventsHandler(ContactCalledPeerEvent)
export class ContactCalledPeerHandler
  implements IEventHandler<ContactCalledPeerEvent> {
  handle(event: ContactCalledPeerEvent) {
    console.log(clc.greenBright('ContactCalledPeerEvent...'))
  }
}
