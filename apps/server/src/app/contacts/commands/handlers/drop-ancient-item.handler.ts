import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { ContactRepository } from '../../repository/contact.repository'
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command'

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
  implements ICommandHandler<DropAncientItemCommand> {
  constructor(
    private readonly repository: ContactRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DropAncientItemCommand) {
    console.log(clc.yellowBright('Async DropAncientItemCommand...'))

    const { contactId, itemId } = command
    const contact = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+contactId)
    )
    contact.addItem(itemId)
    contact.commit()
  }
}
