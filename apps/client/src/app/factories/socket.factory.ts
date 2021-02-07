import { SocketAdapter, SocketConfig } from '@speek/adapter/data-access'
import { InjectionToken } from '@angular/core'

export const SOCKET_TOKEN = new InjectionToken<SocketConfig>('SocketConfig')

export function SocketFactory(config: SocketConfig) {
  return new SocketAdapter(config)
}
