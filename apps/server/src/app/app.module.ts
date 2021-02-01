import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SignalingModule } from './signaling/signaling.module'
import { NetworkModule } from './network/network.module';

@Module({
  imports: [SignalingModule, NetworkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
