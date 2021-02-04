import { SocketConfig } from './socket.adapter'
import { InjectionToken } from '@angular/core'

export const SOCKET_TOKEN = new InjectionToken<SocketConfig>('SocketConfig')
