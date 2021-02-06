import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import * as PeerActions from './peer.actions'
import { PeerEntity } from './peer.models'

export const PEER_FEATURE_KEY = 'peer'

export interface State extends EntityState<PeerEntity> {
  selectedId?: string | number // which Peer record has been selected
  loaded: boolean // has the Peer list been loaded
  error?: string | null // last known error (if any)
}

export interface PeerPartialState {
  readonly [PEER_FEATURE_KEY]: State
}

export const peerAdapter: EntityAdapter<PeerEntity> = createEntityAdapter<PeerEntity>()

export const initialState: State = peerAdapter.getInitialState({
  // set initial required properties
  loaded: false,
})

const peerReducer = createReducer(
  initialState,
  on(PeerActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(PeerActions.loadPeerSuccess, (state, { peer }) =>
    peerAdapter.setAll(peer, { ...state, loaded: true })
  ),
  on(PeerActions.loadPeerFailure, (state, { error }) => ({ ...state, error })),

  on(PeerActions.getMyPeerContact, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PeerActions.getMyPeerContactSuccess, (state, { peer }) =>
    peerAdapter.setOne(peer, { ...state, loaded: true })
  ),
  on(PeerActions.getMyPeerContactFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return peerReducer(state, action)
}
