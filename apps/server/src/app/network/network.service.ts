import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { NetworkSpeedCheck } from '@speek/util-network'
import { download, upload } from '../config/network'

@Injectable()
export class NetworkService {
  constructor(readonly network: NetworkSpeedCheck) {}

  async download(bytes: number) {
    try {
      return await this.network.checkDownloadSpeed(download, +bytes ?? 500000)
    } catch (err) {
      throw new ServiceUnavailableException(err, 'Download unavailable')
    }
  }

  async upload(bytes: number) {
    try {
      return await this.network.checkUploadSpeed(upload, +bytes ?? 2000000)
    } catch (err) {
      throw new ServiceUnavailableException(err, 'Upload unavailable')
    }
  }
}
