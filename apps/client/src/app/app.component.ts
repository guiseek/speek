import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { RemotePeerStore, Peer } from './peer'
import { BehaviorSubject } from 'rxjs'
import { NetworkService } from './network.service'
@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  config = 'client'

  people = []

  peer: RTCPeerConnection

  localStream: MediaStream
  localVideoTrack: MediaStreamTrack
  localAudioTrack: MediaStreamTrack

  @ViewChild('localVideo')
  localVideoRef: ElementRef<HTMLVideoElement>
  localVideo: HTMLVideoElement

  private _call = new BehaviorSubject<boolean>(false)
  call$ = this._call.asObservable()

  peerStore: RemotePeerStore
  newPeerConfig = {
    iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
  }

  upload$ = this.network.upload$
  download$ = this.network.download$
  connection$ = this.network.connection$

  constructor(peerStore: RemotePeerStore, readonly network: NetworkService) {
    this.peerStore = peerStore
    setInterval(() => {
      console.log(this.peerStore.peers)
    }, 2000)
  }

  ngOnInit() {
    this.network.loadUp()
    this.network.loadDown()

    try {
      this.peer = new RTCPeerConnection()
    } catch (err) {
      this.peer = new RTCPeerConnection()
    }

    this.peer.createOffer().then((o) => this.peer.setLocalDescription(o))
  }

  ngAfterViewInit(): void {
    this.localVideo = this.localVideoRef.nativeElement
    // this.play()
  }

  play() {
    this.localStream?.active
      ? this.hangup()
      : navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((stream) => {
            this.localStream = stream
            this.localVideo.muted = true
            this.localVideo.srcObject = stream
            this.localAudioTrack = stream.getAudioTracks().shift()
            this.localVideoTrack = stream.getVideoTracks().shift()
            this.peerStore.add(this.newPeerConfig)
            this._call.next(true)
            this.peerStore.setAllTo(true)
          })
  }

  stopEditing(peer: Peer, editedConfig: RTCConfiguration) {
    peer.config = editedConfig
    peer.editing = false
  }

  cancelEditingPeer(peer: Peer) {
    peer.editing = false
  }

  updateEditingPeer(peer: Peer, editedConfig: RTCConfiguration) {
    editedConfig = editedConfig
    peer.editing = false

    if (editedConfig === 0) {
      return this.peerStore.remove(peer)
    }

    peer.config = editedConfig
  }

  editPeer(peer: Peer) {
    peer.editing = true
  }

  removeCompleted() {
    this.peerStore.removeCompleted()
  }

  toggleCompletion(peer: Peer) {
    this.peerStore.toggleCompletion(peer)
  }

  remove(peer: Peer) {
    this.peerStore.remove(peer)
  }

  addPeer() {
    if (this.newPeerConfig?.iceServers.length) {
      this.peerStore.add(this.newPeerConfig)
      this.newPeerConfig = {
        iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
      }
    }
  }

  hangup() {
    this.localStream.getTracks().forEach((t) => t.stop())
    this.localVideo.srcObject = null
    this._call.next(false)
    this.peer.close()
  }
}
