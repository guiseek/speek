import { io, Socket } from 'socket.io-client'

export class Peer {
  completed: boolean
  editing: boolean

  connection: RTCPeerConnection

  private _config: RTCConfiguration
  get config() {
    return this._config
  }
  set config(value: RTCConfiguration) {
    this._config = value
  }

  constructor(config: RTCConfiguration) {
    this.completed = false
    this.editing = false
    this.config = config
  }
}

export class PeerStore {
  peers: Array<Peer>

  constructor() {
    let persistedPeers = JSON.parse(localStorage.getItem('speek-peers') || '[]')
    // Normalize back into classes
    this.peers = persistedPeers.map(
      (peer: { _config: RTCConfiguration; completed: boolean }) => {
        let ret = new Peer(peer._config)
        ret.completed = peer.completed
        return ret
      }
    )
  }

  protected updateStore() {
    localStorage.setItem('speek-peers', JSON.stringify(this.peers))
  }

  private getWithCompleted(completed: boolean) {
    return this.peers.filter((peer: Peer) => peer.completed === completed)
  }

  allCompleted() {
    return this.peers.length === this.getCompleted().length
  }

  setAllTo(completed: boolean) {
    this.peers.forEach((t: Peer) => (t.completed = completed))
    this.updateStore()
  }

  removeCompleted() {
    this.peers = this.getWithCompleted(false)
    this.updateStore()
  }

  getRemaining() {
    return this.getWithCompleted(false)
  }

  getCompleted() {
    return this.getWithCompleted(true)
  }

  toggleCompletion(peer: Peer) {
    peer.completed = !peer.completed
    this.updateStore()
  }

  remove(peer: Peer) {
    this.peers.splice(this.peers.indexOf(peer), 1)
    this.updateStore()
  }

  add(config: RTCConfiguration) {
    this.peers.push(new Peer(config))
    this.updateStore()
  }
}

export class RemotePeerStore extends PeerStore {
  private socket: Socket

  constructor() {
    super()
    this.socket = io('http://localhost:3333')
    this.socket.on('connected', (data) => console.log('data: ', data))
    this.socket.on('peers', (updatedPeers: Array<Peer>) => {
      this.peers = updatedPeers
    })
  }

  protected updateStore() {
    this.socket.emit(
      'update-store',
      this.peers.map(({ config, editing, completed }) => ({
        config,
        editing,
        completed,
      }))
    )
  }
}
