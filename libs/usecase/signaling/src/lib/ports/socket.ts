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

export interface Socket {
  // io: Manager
  io: Socket
  id: string
  connected: boolean
  disconnected: boolean
  receiveBuffer: (readonly any[])[]
  active(): boolean
  connect(): Socket
  open(): Socket
  send(...args: any[]): Socket
  emit(ev: string, ...args: any[]): Socket
  disconnect(): Socket
  close(): Socket
  on(event: string, listener: Function): import('component-emitter')<string>
  once(event: string, listener: Function): import('component-emitter')<string>
  off(event?: string, listener?: Function): import('component-emitter')<string>
  listeners(event: string): Function[]
  hasListeners(event: string): boolean
}
