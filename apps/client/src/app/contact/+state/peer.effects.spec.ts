import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { NxModule, DataPersistence } from '@nrwl/angular'
import { hot } from '@nrwl/angular/testing'

import { PeerEffects } from './peer.effects'
import * as PeerActions from './peer.actions'

describe('PeerEffects', () => {
  let actions: Observable<any>
  let effects: PeerEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        PeerEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    })

    effects = TestBed.inject(PeerEffects)
  })

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PeerActions.init() })

      const expected = hot('-a-|', {
        a: PeerActions.loadPeerSuccess({ peer: [] }),
      })

      expect(effects.init$).toBeObservable(expected)
    })
  })
})
