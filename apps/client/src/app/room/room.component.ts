import { UUID } from '@speek/util/format'
import { PeerController } from '@speek/util/peer'
import { PeerConnection } from '@speek/usecase/peer'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { SocketAdapter } from '@speek/adapter/data-access'
import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'speek-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [PeerConnection],
})
export class RoomComponent implements OnInit {
  // connection = new PeerConnection()
  peer: RTCPeerConnection
  code = UUID.short()
  sender = UUID.long()

  localStream: MediaStream
  localVideoTrack: MediaStreamTrack
  localAudioTrack: MediaStreamTrack

  @ViewChild('localVideo')
  localVideoRef: ElementRef<HTMLVideoElement>
  localVideo: HTMLVideoElement

  private _call = new BehaviorSubject<boolean>(false)
  call$ = this._call.asObservable()

  constructor(
    readonly socket: SocketAdapter,
    readonly controller: PeerController,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.initWithCode(this._route.snapshot.params)
  }

  initWithCode({ code }: Params) {
    this.code = code
    if (!code) this._router.navigate(['/room', UUID.long()])
    this.socket.onActions(SpeekAction.Offer).subscribe(this.handle.bind(this))
    this.socket.emit(SpeekAction.CreateOrJoin, { code })
  }

  handle({ data, sender }: SpeekPayload) {
    try {
      console.log(sender !== this.sender, sender, this.sender)

      if (sender !== this.sender) {
        const { sdp, ice } = data
        if (this.controller.peer !== null && ice !== undefined) {
          this.controller.peer.addIceCandidate(new RTCIceCandidate(ice))
        }
        if (sdp)
          switch (sdp.type) {
            case SpeekAction.Offer:
              return this.controller.createAnswer(sdp)
            case SpeekAction.Answer:
              return this.controller.setRemote(sdp)
          }
      }
    } catch (error) {
      throw new Error('handle-message')
    }
  }

  ngOnInit(): void {
    this.controller.createOffer().then((sdp) => {
      this.socket.send(
        SpeekAction.Offer,
        new SpeekPayload(this.sender, this.code, { sdp })
      )
    })
  }

  ngAfterViewInit(): void {
    this.localVideo = this.localVideoRef.nativeElement
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
            this._call.next(true)
          })
  }

  hangup() {
    this.localStream.getTracks().forEach((t) => t.stop())
    this.localVideo.srcObject = null
    this._call.next(false)
    if (this.peer) {
      this.peer.close()
    }
  }
}
