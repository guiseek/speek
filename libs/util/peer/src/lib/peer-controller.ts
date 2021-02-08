import { Observable } from 'rxjs'

export class PeerController {
  peer: RTCPeerConnection
  onChange: Observable<RTCPeerConnection>
  onCandidate: Observable<RTCIceCandidate>
  onTrack: Observable<MediaStream>
  constructor() {
    const config: RTCConfiguration = {
      iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
    }
    this.peer = new RTCPeerConnection(config)

    this.onChange = new Observable<RTCPeerConnection>((subscriber) => {
      this.peer.addEventListener('signalingstatechange', ({ target }) =>
        subscriber.next(target as RTCPeerConnection)
      )
    })

    this.onCandidate = new Observable<RTCIceCandidate>((subscriber) => {
      this.peer.addEventListener('icecandidate', ({ candidate }) =>
        subscriber.next(candidate)
      )
    })

    this.onTrack = new Observable<MediaStream>((subscriber) => {
      this.peer.addEventListener('track', ({ streams }) =>
        subscriber.next(streams[0])
      )
    })
  }

  createOffer = (options?: RTCOfferOptions) => {
    return new Promise<RTCSessionDescription>((resolve, reject) => {
      this.peer
        .createOffer(options)
        .then((sdp) => this.peer.setLocalDescription(sdp))
        .then(() => resolve(this.peer.localDescription))
        .catch((err) => reject(err))
    })
  }

  createAnswer = (options?: RTCSessionDescription) => {
    return new Promise((resolve, reject) => {
      this.peer
        .setRemoteDescription(options)
        .then(() => this.peer.createAnswer())
        .then((sdp) => this.peer.setLocalDescription(sdp))
        .then(() => resolve(this.peer.localDescription))
        .catch((err) => reject(err))
    })
  }

  setRemote(description?: RTCSessionDescription) {
    return this.peer.setRemoteDescription(
      new RTCSessionDescription(description)
    )
  }

  addCandidate = (candidate: RTCIceCandidate) => {
    return this.peer.addIceCandidate(new RTCIceCandidate(candidate))
  }
}
