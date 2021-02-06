import { AggregateRoot } from '@nestjs/cqrs'
import { ContactFoundItemEvent } from '../events/impl/contact-found-item.event'
import { ContactCalledPeerEvent } from '../events/impl/contact-called-peer.event'

export class Contact extends AggregateRoot {
  constructor(private readonly id: string) {
    super()
  }

  callUser(userId: string) {
    // logic
    this.apply(new ContactCalledPeerEvent(this.id, userId))
  }

  addItem(itemId: string) {
    // logic
    this.apply(new ContactFoundItemEvent(this.id, itemId))
  }
}
