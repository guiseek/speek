import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { DropAncientItemCommand } from '../commands/impl/drop-ancient-item.command'
import { ContactCalledPeerEvent } from '../events/impl/contact-called-peer.event'

const itemId = '0'

@Injectable()
export class ContactsGameSagas {
  @Saga()
  peerCalled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ContactCalledPeerEvent),
      // delay(1000),
      map((event) => {
        console.log(clc.redBright('Inside [ContactsGameSagas] Saga'))
        return new DropAncientItemCommand(event.contactId, itemId)
      })
    )
  }
}
