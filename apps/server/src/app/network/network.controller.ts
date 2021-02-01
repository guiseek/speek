import { Controller, Get, Param } from '@nestjs/common'
import { NetworkService } from './network.service'

@Controller('network')
export class NetworkController {
  constructor(readonly network: NetworkService) {}

  @Get('download/:bytes')
  async getNetworkDownloadSpeed(@Param('bytes') bytes?: string) {
    return await this.network.download(+bytes)
  }

  @Get('upload/:bytes')
  async getNetworkUploadSpeed(@Param('bytes') bytes?: string) {
    return await this.network.upload(+bytes)
  }
}
