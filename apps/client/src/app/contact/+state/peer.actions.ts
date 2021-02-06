import { createAction, props } from '@ngrx/store'
import { PeerContact } from '@speek/core/entity'
import { PeerEntity } from './peer.models'

export const init = createAction('[Peer Page] Init')

export const loadPeerSuccess = createAction(
  '[Peer/API] Load Peer Success',
  props<{ peer: PeerEntity[] }>()
)

export const loadPeerFailure = createAction(
  '[Peer/API] Load Peer Failure',
  props<{ error: any }>()
)


export const getMyPeerContact = createAction('[Peer Page] Get My PeerContact')

export const getMyPeerContactSuccess = createAction(
  '[Peer/API] Get My PeerContact Success',
  props<{ peer: PeerContact }>()
)

export const getMyPeerContactFailure = createAction(
  '[Peer/API] Get My PeerContact Failure',
  props<{ error: any }>()
)
