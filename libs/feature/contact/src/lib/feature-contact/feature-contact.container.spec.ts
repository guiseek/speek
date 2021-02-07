import { Peer } from '@speek/adapter/data-access';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PeerContact, UserContact } from '@speek/core/entity'
import { ContactRepository } from '@speek/usecase/contact'
import { Observable, of } from 'rxjs'

import { FeatureContactContainer } from './feature-contact.container'
import { SharedUiModule, SpeekDrawer } from '@speek/shared/ui';
import { PeerStorage } from '@speek/usecase/peer';

class Repository implements ContactRepository {
  contacts$: Observable<UserContact[]>
  whoIsOutThere(peer: PeerContact): Observable<PeerContact[]> {
    return of([])
  }
  loadContacts(): Observable<UserContact[]> {
    return of([])
  }
  query(q?: string): void {

  }
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
      imports: [MatIconModule, SharedUiModule],
      providers: [
        SpeekDrawer,
        { provide: PeerStorage, useClass: Peer },
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
