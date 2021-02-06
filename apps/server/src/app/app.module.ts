import { Module } from '@nestjs/common'

import { SignalingModule } from './signaling/signaling.module'
import { ContactsModule } from './contacts/contacts.module'
import { NetworkModule } from './network/network.module'
import { RoomModule } from './room/room.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [SignalingModule, NetworkModule, RoomModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
