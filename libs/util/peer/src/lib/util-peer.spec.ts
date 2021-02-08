import { utilPeer } from './util-peer'
import '@speek/util/testing'

describe('utilPeer', () => {
  it('should work', () => {
    expect(utilPeer()).toEqual('util-peer')
  })
})
