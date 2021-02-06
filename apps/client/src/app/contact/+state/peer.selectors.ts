import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  PEER_FEATURE_KEY,
  State,
  PeerPartialState,
  peerAdapter,
} from './peer.reducer'

// Lookup the 'Peer' feature state managed by NgRx
export const getPeerState = createFeatureSelector<PeerPartialState, State>(
  PEER_FEATURE_KEY
)

const { selectAll, selectEntities } = peerAdapter.getSelectors()

export const getPeerLoaded = createSelector(
  getPeerState,
  (state: State) => state.loaded
)

export const getPeerError = createSelector(
  getPeerState,
  (state: State) => state.error
)

export const getAllPeer = createSelector(getPeerState, (state: State) =>
  selectAll(state)
)

export const getPeerEntities = createSelector(getPeerState, (state: State) =>
  selectEntities(state)
)

export const getSelectedId = createSelector(
  getPeerState,
  (state: State) => state.selectedId
)

export const getSelected = createSelector(
  getPeerEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
)
