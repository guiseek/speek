import { PickContacts } from './pick-contacts'

describe('PickContacts', () => {
  let usecase: PickContacts

  beforeEach(() => (usecase = new PickContacts()))

  it('should work', () => {
    expect(usecase).toBeDefined()
  })
})
