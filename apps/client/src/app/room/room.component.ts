import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  peer: RTCPeerConnection

  localStream: MediaStream
  localVideoTrack: MediaStreamTrack
  localAudioTrack: MediaStreamTrack

  @ViewChild('localVideo')
  localVideoRef: ElementRef<HTMLVideoElement>
  localVideo: HTMLVideoElement

  private _call = new BehaviorSubject<boolean>(false)
  call$ = this._call.asObservable()

  constructor() {}

  ngOnInit(): void {}

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
    this.peer.close()
  }
}
