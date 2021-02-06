import { PeerEntity } from './peer.models'
import * as PeerActions from './peer.actions'
import { State, initialState, reducer } from './peer.reducer'

describe('Peer Reducer', () => {
  const createPeerEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PeerEntity)

  beforeEach(() => {})

  describe('valid Peer actions', () => {
    it('loadPeerSuccess should return set the list of known Peer', () => {
      const peer = [
        createPeerEntity('PRODUCT-AAA'),
        createPeerEntity('PRODUCT-zzz'),
      ]
      const action = PeerActions.loadPeerSuccess({ peer })

      const result: State = reducer(initialState, action)

      expect(result.loaded).toBe(true)
      expect(result.ids.length).toBe(2)
    })
  })

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any

      const result = reducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
