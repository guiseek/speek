import { NetworkSpeedCheck } from '@speek/util-network'
import { NetworkController } from './network.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [NetworkController],
  providers: [NetworkSpeedCheck],
})
export class NetworkModule {}
