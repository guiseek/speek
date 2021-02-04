import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SignalingModule } from './signaling/signaling.module'
import { NetworkModule } from './network/network.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [SignalingModule, NetworkModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
