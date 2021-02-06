import { PeerEntity } from './peer.models'
import { State, peerAdapter, initialState } from './peer.reducer'
import * as PeerSelectors from './peer.selectors'

describe('Peer Selectors', () => {
  const ERROR_MSG = 'No Error Available'
  const getPeerId = (it) => it['id']
  const createPeerEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PeerEntity)

  let state

  beforeEach(() => {
    state = {
      peer: peerAdapter.setAll(
        [
          createPeerEntity('PRODUCT-AAA'),
          createPeerEntity('PRODUCT-BBB'),
          createPeerEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    }
  })

  describe('Peer Selectors', () => {
    it('getAllPeer() should return the list of Peer', () => {
      const results = PeerSelectors.getAllPeer(state)
      const selId = getPeerId(results[1])

      expect(results.length).toBe(3)
      expect(selId).toBe('PRODUCT-BBB')
    })

    it('getSelected() should return the selected Entity', () => {
      const result = PeerSelectors.getSelected(state)
      const selId = getPeerId(result)

      expect(selId).toBe('PRODUCT-BBB')
    })

    it("getPeerLoaded() should return the current 'loaded' status", () => {
      const result = PeerSelectors.getPeerLoaded(state)

      expect(result).toBe(true)
    })

    it("getPeerError() should return the current 'error' state", () => {
      const result = PeerSelectors.getPeerError(state)

      expect(result).toBe(ERROR_MSG)
    })
  })
})
