import { GetMyContact } from '@speek/usecase/contact'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'

import * as PeerFeature from './peer.reducer'
import * as PeerActions from './peer.actions'
import { map, switchMap } from 'rxjs/operators'

@Injectable()
export class PeerEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeerActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return PeerActions.loadPeerSuccess({ peer: [] })
        },

        onError: (action, error) => {
          console.error('Error', error)
          return PeerActions.loadPeerFailure({ error })
        },
      })
    )
  )

  getMyPeerContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeerActions.getMyPeerContact),
      fetch({
        run: (action) => {
          console.log(action)
          return this.getMyContact
            .execute()
            .pipe(
              map((contact) =>
                PeerActions.getMyPeerContactSuccess({ peer: contact })
              )
            )
          // Your custom service 'load' logic goes here. For now just return a success action...
          // return PeerActions.loadPeerSuccess({ peer: [] })
        },

        onError: (action, error) => {
          console.error('Error', error)
          return PeerActions.getMyPeerContactFailure({ error })
        },
      })
    )
  )

  getMyContact: GetMyContact
  constructor(private actions$: Actions, private http: HttpClient) {
    this.getMyContact = new GetMyContact(http)
  }
}
