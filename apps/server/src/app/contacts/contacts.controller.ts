import { map } from 'rxjs/operators';
import { GetContactsQuery, GetMyContactQuery } from './queries/impl'
import { Body, Controller, Get, MessageEvent, Param, Post, Sse } from '@nestjs/common'
import { CallPeerCommand } from './commands/impl/call-peer.command'
import { CallPeerDto } from './interfaces/call-peer-dto.interface'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Contact } from './models/contact.model'
import { interval, Observable } from 'rxjs'

@Controller('contact')
export class ContactsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post(':id/call')
  async callPeer(@Param('id') id: string, @Body() dto: CallPeerDto) {
    return this.commandBus.execute(new CallPeerCommand(id, dto.peerId))
  }

  @Post('public')
  async findAll(): Promise<Contact[]> {
    return this.queryBus.execute(new GetContactsQuery())
  }

  @Get()
  async whoAmI(): Promise<Contact> {
    return this.queryBus.execute(new GetMyContactQuery())
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })))
  }
}
