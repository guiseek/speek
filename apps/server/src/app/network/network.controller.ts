import { NetworkSpeedCheck } from '@speek/util-network'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('network')
export class NetworkController {
  constructor(readonly network: NetworkSpeedCheck) {}

  @Get('download/:bytes')
  async getNetworkDownloadSpeed(@Param('bytes') bytes?: string) {
    return await this.network.checkDownloadSpeed(
      'http://eu.httpbin.org/stream-bytes/500000',
      +bytes ?? 500000
    )
  }

  @Get('upload/:bytes')
  async getNetworkUploadSpeed(@Param('bytes') bytes?: string) {
    return await this.network.checkUploadSpeed(
      {
        port: 80,
        method: 'POST',
        hostname: 'www.google.com',
        path: '/catchers/544b09b4599c1d0200000289',
        headers: { 'Content-Type': 'application/json' },
      },
      +bytes ?? 2000000
    )
  }
}
