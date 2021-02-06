import { TestBed } from '@angular/core/testing'

import { SpeekDrawer } from './speek-drawer'

describe('SpeekDrawer', () => {
  let service: SpeekDrawer

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SpeekDrawer)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
