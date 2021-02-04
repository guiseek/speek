import { UUID } from '@speek/util/format'
import { Signaling } from '@speek/usecase/signaling'
import { UseCase, SpeekAction, SpeekPayload } from '@speek/core/entity'

export class PeerConnection implements UseCase<Signaling, RTCPeerConnection> {
  counter = 0
  code = UUID.short()
  sender = UUID.long()
  signaling: Signaling
  peer: RTCPeerConnection
  execute(signaling: Signaling): Promise<RTCPeerConnection> {
    this.peer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
    })
    this.signaling = signaling
    const payload = new SpeekPayload(this.sender, this.code)

    signaling.on(SpeekAction.Offer).subscribe(this.handle)

    signaling.send(SpeekAction.CreateOrJoin, payload)

    this.peer.addEventListener('icecandidate', ({ candidate }) => {
      const data = { ice: candidate }
      signaling.send(SpeekAction.Offer, { ...payload, data })
    })

    return Promise.resolve(this.peer)
  }

  handle = ({ data, sender, code }: SpeekPayload) => {
    console.log(data, sender, code)

    try {
      console.log(sender !== this.sender, sender, this.sender)

      if (sender !== this.sender) {
        const { sdp, ice } = data
        if (this.peer !== null && ice !== undefined) {
          this.peer.addIceCandidate(new RTCIceCandidate(ice))
        }
        if (sdp)
          switch (sdp.type) {
            case SpeekAction.Offer:
              return this.createAnswer(sdp)
            case SpeekAction.Answer:
              return this.setRemote(sdp)
          }
      }
    } catch (error) {
      // throw new PeekError('handle-message', 2)
    }
  }

  async createAnswer(sdp: RTCSessionDescription) {
    try {
      return this.peer
        .setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => this.peer.createAnswer())
        .then((a) => this.peer.setLocalDescription(a))
        .then(() => {
          const data = { sdp: this.peer.localDescription }
          this.signaling.send(
            SpeekAction.Offer,
            new SpeekPayload(this.sender, this.code, data)
          )
        })
    } catch (error) {
      // throw new PeekError('create-answer', 3)
    }
  }
  async createOffer() {
    try {
      return this.peer
        .createOffer({
          voiceActivityDetection: true,
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
        .then((offer) => this.peer.setLocalDescription(offer))
        .then(() => ({ sdp: this.peer.localDescription }))
        .then((data) =>
          this.signaling.send(
            SpeekAction.Offer,
            new SpeekPayload(this.sender, this.code, data)
          )
        )
    } catch (error) {
      // throw new PeekError('create-peer', 0)
    }
  }
  private setRemote(sdp: RTCSessionDescription) {
    this.peer.setRemoteDescription(sdp)
  }
}
