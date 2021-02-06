import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { ContactService } from './contact.service'

describe('ContactService', () => {
  let service: ContactService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService],
    })
    service = TestBed.inject(ContactService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
