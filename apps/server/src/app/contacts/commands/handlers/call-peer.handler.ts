import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { ContactRepository } from '../../repository/contact.repository'
import { CallPeerCommand } from '../impl/call-peer.command'

@CommandHandler(CallPeerCommand)
export class CallPeerHandler implements ICommandHandler<CallPeerCommand> {
  constructor(
    private readonly repository: ContactRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CallPeerCommand) {
    console.log(clc.greenBright('CallPeerCommand...'))

    const { contactId, peerId } = command
    const contact = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+contactId)
    )
    contact.callUser(peerId)
    contact.commit()
  }
}
