export interface SocketOptions {
  auth: object | ((cb: (data: object) => void) => void)
  forceNew: boolean
  multiplex: boolean
  path: string
  reconnection: boolean
  reconnectionAttempts: number
  reconnectionDelay: number
  reconnectionDelayMax: number
  randomizationFactor: number
  timeout: number
  autoConnect: boolean
  parser: any
  host: string
  hostname: string
  secure: boolean
  port: string
  query: Object
  agent: string | boolean
  upgrade: boolean
  forceJSONP: boolean
  jsonp: boolean
  forceBase64: boolean
  enablesXDR: boolean
  timestampParam: string
  timestampRequests: boolean
  transports: string[]
  policyPost: number
  rememberUpgrade: boolean
  onlyBinaryUpgrades: boolean
  transportOptions: Object
  pfx: string
  key: string
  passphrase: string
  cert: string
  ca: string | string[]
  ciphers: string
  rejectUnauthorized: boolean
  extraHeaders?: { [header: string]: string }
  withCredentials: boolean
}

export abstract class SpeekSocket {
  // io: Manager
  io: SpeekSocket
  id: string
  connected: boolean
  disconnected: boolean
  receiveBuffer: (readonly any[])[]
  abstract active(): boolean
  abstract connect(): SpeekSocket
  abstract open(): SpeekSocket
  abstract send(...args: any[]): SpeekSocket
  abstract emit(ev: string, ...args: any[]): SpeekSocket
  abstract disconnect(): SpeekSocket
  abstract close(): SpeekSocket
  abstract on(
    event: string,
    listener: Function
  ): import('component-emitter')<string>
  abstract once(
    event: string,
    listener: Function
  ): import('component-emitter')<string>
  abstract off(
    event?: string,
    listener?: Function
  ): import('component-emitter')<string>
  abstract listeners(event: string): Function[]
  abstract hasListeners(event: string): boolean
}
