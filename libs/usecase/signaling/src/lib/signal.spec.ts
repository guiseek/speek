import { Observable } from 'rxjs'
import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { SpeekSocket, SocketOptions } from './ports/socket'
import { Signal } from './signal'

const socket: Partial<SpeekSocket> = {
  on: jest.fn(),
  send: jest.fn(),
}

describe('Signal', () => {
  let signal: Signal

  beforeEach(() => {
    signal = new Signal(socket as SpeekSocket)
  })
  it('should create an instance', () => {
    expect(signal).toBeTruthy()
  })

  it('should send offer with payload', () => {
    signal.send(SpeekAction.Offer, new SpeekPayload('123', '321', {}))
    expect(signal['socket'].send).toHaveBeenCalled()
    expect(signal['socket'].send).toHaveBeenCalledWith('offer', {
      code: '321',
      data: {},
      sender: '123',
    })
  })

  it('should listen events', () => {
    const observer$ = signal.on(SpeekAction.Offer)
    expect(observer$).toBeInstanceOf(Observable)
    const $observer = observer$.subscribe((payload) => {
      expect(signal['socket'].on).toHaveBeenCalled()
      expect(payload).toBeInstanceOf(SpeekPayload)
      $observer.unsubscribe()
    })
  })
})
