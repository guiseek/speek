import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CallButton } from './call.button'

describe('CallButton', () => {
  let component: CallButton
  let fixture: ComponentFixture<CallButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallButton],
      imports: [MatButtonModule, MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CallButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
