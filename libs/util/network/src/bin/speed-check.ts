import { NetworkSpeedCheck } from '../lib/speed-check'

const networkSpeed = new NetworkSpeedCheck()

async function getNetworkDownloadSpeed() {
  const baseUrl = 'http://eu.httpbin.org/stream-bytes/500000'
  const fileSizeInBytes = 500000
  const speed = await networkSpeed.checkDownloadSpeed(
    baseUrl,
    fileSizeInBytes
  )
  console.log(`Download Speed:`)
  console.log(speed);

}

async function getNetworkUploadSpeed() {
  const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/catchers/544b09b4599c1d0200000289',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const fileSizeInBytes = 2000000
  const speed = await networkSpeed.checkUploadSpeed(
    options,
    fileSizeInBytes
  )
  console.log(`Upload Speed:`)
  console.log(speed);

}

getNetworkDownloadSpeed()
getNetworkUploadSpeed()
