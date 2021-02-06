import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers'
import { EventHandlers } from './events/handlers'
import { ContactsController } from './contacts.controller'
import { QueryHandlers } from './queries/handlers'
import { ContactRepository } from './repository/contact.repository'
import { ContactsGameSagas } from './sagas/contacts.sagas'

@Module({
  imports: [CqrsModule],
  controllers: [ContactsController],
  providers: [
    ContactRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ContactsGameSagas,
  ],
})
export class ContactsModule {}
