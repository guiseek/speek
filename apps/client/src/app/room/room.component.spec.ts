import { RouterTestingModule } from '@angular/router/testing'
import { SocketFactory, SOCKET_TOKEN } from './../factories/socket.factory'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule, ButtonsModule } from '@speek/shared/ui'
import { RoomComponent } from './room.component'
import { SocketAdapter } from '@speek/adapter/data-access'
import { PeerController } from '@speek/util/peer'
import { Observable } from 'rxjs'

class Controller implements PeerController {
  peer: RTCPeerConnection
  onChange: Observable<RTCPeerConnection>
  onCandidate: Observable<RTCIceCandidate>
  onTrack: Observable<MediaStream>
  createOffer = (options?: RTCOfferOptions) =>
    Promise.resolve(null as RTCSessionDescription)
  createAnswer = () =>
    Promise.resolve(null)
  setRemote(description?: RTCSessionDescription): Promise<void> {
    return Promise.resolve()
  }
  addCandidate: (candidate: RTCIceCandidate) => Promise<void>
}

describe('RoomComponent', () => {
  let component: RoomComponent
  let fixture: ComponentFixture<RoomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        ButtonsModule,
      ],
      declarations: [RoomComponent],
      providers: [
        { provide: PeerController, useClass: Controller },
        { provide: RTCPeerConnection, useValue: class {} },
        { provide: SOCKET_TOKEN, useValue: {} },
        {
          provide: SocketAdapter,
          useFactory: SocketFactory,
          deps: [SOCKET_TOKEN],
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
