import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PeerContact } from '@speek/core/entity'
import { ContactRepository } from '@speek/usecase/contact'
import { Observable, of } from 'rxjs'

import { FeatureContactContainer } from './feature-contact.container'

class Repository implements ContactRepository {
  createOffer(params: RTCOfferOptions): Observable<RTCSessionDescription> {
    return of()
  }
  createAnswer(params: RTCAnswerOptions): Observable<RTCSessionDescription> {
    return of()
  }
  whoAmI(): Observable<PeerContact> {
    return of({ id: '', me: true })
  }
}

describe('FeatureContactContainer', () => {
  let component: FeatureContactContainer
  let fixture: ComponentFixture<FeatureContactContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureContactContainer],
      providers: [
        {
          provide: ContactRepository,
          useClass: Repository,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureContactContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
