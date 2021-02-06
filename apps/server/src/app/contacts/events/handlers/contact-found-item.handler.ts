import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { ContactFoundItemEvent } from '../impl/contact-found-item.event'

@EventsHandler(ContactFoundItemEvent)
export class ContactFoundItemHandler
  implements IEventHandler<ContactFoundItemEvent> {
  handle(event: ContactFoundItemEvent) {
    console.log(clc.yellowBright('Async ContactFoundItemEvent...'))
  }
}
