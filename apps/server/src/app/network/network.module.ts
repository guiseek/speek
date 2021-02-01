import { NetworkSpeedCheck } from '@speek/util-network'
import { NetworkController } from './network.controller'
import { Module } from '@nestjs/common'
import { NetworkService } from './network.service';

@Module({
  controllers: [NetworkController],
  providers: [NetworkSpeedCheck, NetworkService],
})
export class NetworkModule {}
