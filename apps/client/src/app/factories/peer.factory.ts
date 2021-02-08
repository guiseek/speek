import { PeerController } from '@speek/util/peer'
import { InjectionToken } from '@angular/core'

export const PEER_TOKEN = new InjectionToken<RTCConfiguration>('PeerConfig')

export function PeerFactory(config?: RTCConfiguration) {
  return new PeerController()
}
